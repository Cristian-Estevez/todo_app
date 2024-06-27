from django.db import models
from django.db.models.base import Model

class Folder(models.Model):
    name = models.CharField(max_length=200)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-pk']

class Task(models.Model):
    title = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title