from django.db import models
from django.db.models.base import Model

class Folder(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Task(models.Model):
    title = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)

    def __str__(self):
        return self.title