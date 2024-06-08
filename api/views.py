from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer, FolderSerializer
from .models import Folder

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Folder List': '/folder-list/',
        'Folder Create': '/folder-create/',
        'Folder Delete': '/folder-delete/',
        'Task List': '/folder/task-list/',
        'Task Create': '/folder/task-create/',
        'Task Update': '/folder/task-update/',
        'Task Delete': '/folder/task-delete/',
    }

    return Response(api_urls)

@api_view(['POST'])
def taskList(request):
    folder = Folder.objects.get(pk=request.data['folderId'])
    tasks = folder.task_set.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request):
    folder = Folder.objects.get(id=request.data['folderId'])
    task = folder.task_set.get(id=request.data['task']['id'])
    toSerialize = {
        'folder': request.data['folderId'],
        'title': request.data['task']['title'],
        'completed': request.data['task']['completed']
    }

    serializer = TaskSerializer(instance=task, data=toSerialize)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)
    

@api_view(['DELETE'])
def taskDelete(request):
    folder = Folder.objects.get(id=request.data['folderId'])
    task = folder.task_set.get(id=request.data['taskId'])
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
def folderDelete(request):
    folder = Folder.objects.get(id=request.data['id'])
    folder.delete()

    return Response("Folder deleted successfully!!")
