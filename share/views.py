from django.shortcuts import render, redirect
from django.views import View
from . import models
from django.db.models import Sum
from . import forms


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


class AddDonationView(View):
    def get(self, request):
        return render(request, 'share/form.html')


class LoginView(View):
    def get(self, request):
        return render(request, 'share/login.html')


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
