from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer, FolderSerializer
from .models import Task, Folder

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Folder List': '/folder-list/',
        'Folder Create': '/folder-create/',
        'Folder Delete': '/folder-delete/<str:pk>/',
        'Task List': '/folder/<str:pk>/task-list/',
        'Task Create': '/folder/<str:pk>/task-create/',
        'Task Update': '/folder/<str:folder_pk>/task-update/<str:pk>',
        'Task Delete': '/folder/<str:folder_pk>/task-delete/<str:pk>',
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
    request.data['folder'] = pk
    serializer = TaskSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, folder_pk, pk):
    folder = Folder.objects.get(id=folder_pk)
    task = folder.task_set.get(id=pk)
    request.data["folder"] = folder_pk
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
    	serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, folder_pk, pk):
    folder = Folder.objects.get(id=folder_pk)
    task = folder.task_set.get(id=pk)
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

@api_view(['DELETE'])
def folderDelete(request, pk):

    folder = Folder.objects.get(id=pk)
    folder.delete()
    
    return Response("Folder deleted successfully!!")  