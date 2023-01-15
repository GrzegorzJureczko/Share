from django.shortcuts import render
from django.views import View


# Create your views here.


class LandingPageView(View):
    def get(self, request):
        return render(request, 'share/index.html')


class AddDonationView(View):
    def get(self, request):
        return render(request, 'share/form.html')


class LoginView(View):
    def get(self, request):
        return render(request, 'share/login.html')


class RegisterView(View):
    def get(self, request):
        return render(request, 'share/register.html')
