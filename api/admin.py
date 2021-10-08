from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    fields = ('title', 'completed')
    list_display = ('title', 'completed')
