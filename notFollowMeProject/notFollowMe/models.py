from django.db import models

class User(models.Model):
    screen_name = models.CharField(max_length=128)
    
# Create your models here.
