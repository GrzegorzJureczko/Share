from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=40)

    objects = models.Manager()

    def __str__(self):
        return self.name


class Institution(models.Model):
    name = models.CharField(max_length=40)
    description = models.CharField(max_length=40)
    type = models.CharField(max_length=40, default='foundation', choices=[
        ('foundation', 'Fundacja'),
        ('nongovorg', 'Organizacja pozarządowa'),
        ('local', 'zbiórka lokalna'),
    ])
    categories = models.ManyToManyField('Category')

    objects = models.Manager()

    def __str__(self):
        return self.name


class Donation(models.Model):
    quantity = models.IntegerField()
    categories = models.ManyToManyField('Category')
    institution = models.ForeignKey('Institution', on_delete=models.CASCADE)
    address = models.CharField(max_length=40)
    phone_number = models.IntegerField()
    city = models.CharField(max_length=20)
    zip_code = models.CharField(max_length=20)
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = models.Manager()

    def __str__(self):
        return f'{self.institution}, {self.quantity}, {self.address}'
