from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer, FolderSerializer
from .models import Task, Folder

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>',
        'Delete': '/task-delete/<str:pk>',
    }

    return Response(api_urls)

@api_view(['GET'])
def taskList(request, pk):
    folder = Folder.objects.get(id=pk)
    tasks = folder.task_set.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request, pk):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
    	serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    
    return Response("Task deleted successfully!!")

@api_view(['GET'])
def folderList(request):
    
    folders = Folder.objects.all()
    serializer = FolderSerializer(folders, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def folderCreate(request):

    serializer = FolderSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)