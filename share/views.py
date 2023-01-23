from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.views import View
from . import models
from django.db.models import Sum
from . import forms
from django.contrib.auth.decorators import login_required


# Create your views here.


class LandingPageView(View):
    def get(self, request):
        donation_quantity = models.Donation.objects.aggregate(Sum('quantity'))['quantity__sum']
        if donation_quantity == None:
            donation_quantity = 0
        supported_organizations = len(models.Donation.objects.values('institution').distinct())

        foundations = models.Institution.objects.filter(type='foundation')
        nongovorgs = models.Institution.objects.filter(type='nongovorg')
        locals = models.Institution.objects.filter(type='local')

        categories = models.Category.objects.all()
        return render(request, 'share/index.html',
                      {'donation_quantity': donation_quantity, 'supported_organizations': supported_organizations,
                       'foundations': foundations, 'nongovorgs': nongovorgs, 'locals': locals,
                       'categories': categories})


class AddDonationView(LoginRequiredMixin, View):
    login_url = 'share:login'
    redirect_field_name = 'share:add_donation'

    def get(self, request):
        categories = models.Category.objects.all()
        organizations = models.Institution.objects.all()
        return render(request, 'share/form.html', {'categories': categories, 'organizations': organizations})


class LoginView(View):
    def get(self, request):
        form = forms.LoginForm(request)
        return render(request, 'share/login.html', {'form': form})

    def post(self, request):
        form = forms.LoginForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')

            user = authenticate(email=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('share:index')

        return redirect('share:register')


class RegisterView(View):
    def get(self, request):
        form = forms.UserForm()
        return render(request, 'share/register.html', {'form': form})

    def post(self, request):
        form = forms.UserForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = True
            user.save()
            return redirect('share:login')

        return render(request, 'share/register.html', {'form': form})


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('share:index')
