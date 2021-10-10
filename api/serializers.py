from rest_framework import serializers
from .models import Task, Folder

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class FolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folder
        fields = '__all__'