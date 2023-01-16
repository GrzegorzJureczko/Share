from django.contrib import admin

# Register your models here.
from . import models
from .models import User

admin.site.register(models.Category)
admin.site.register(models.Donation)
admin.site.register(models.Institution)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
