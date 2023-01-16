from django import forms
from django.core.exceptions import ValidationError

from . import models


class UserForm(forms.ModelForm):
    first_name = forms.CharField(max_length=128, widget=forms.TextInput(attrs={'placeholder': 'Imię'}), label='')
    last_name = forms.CharField(max_length=128, widget=forms.TextInput(attrs={'placeholder': 'Nazwisko'}), label='')
    email = forms.EmailField(max_length=128, widget=forms.EmailInput(attrs={'placeholder': 'Email'}), label='')
    password = forms.CharField(max_length=128, widget=forms.PasswordInput(attrs={'placeholder': 'Hasło'}), label='')
    password_confirmation = forms.CharField(max_length=128, widget=forms.PasswordInput(attrs={'placeholder': 'Powtórz hasło'}),
                                label='')

    class Meta:
        model = models.User
        fields = ('first_name', 'last_name', 'email', 'password', 'password_confirmation')

    def clean_password_confirmation(self):
        password = self.cleaned_data.get('password')
        password_confirmation = self.cleaned_data.get('password_confirmation')

        if password and password_confirmation and password != password_confirmation:
            raise ValidationError('incorrect password')

        return password_confirmation

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data.get('password'))

        if commit:
            user.save()

        return user
