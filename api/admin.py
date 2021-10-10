from django.contrib import admin
from .models import Task, Folder

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    fields = ('title', 'completed', 'folder',)
    list_display = ('title', 'completed', 'folder',)

@admin.register(Folder)
class FolderAdmin(admin.ModelAdmin):
    fields = ('name',)
    list_display = ('name',)