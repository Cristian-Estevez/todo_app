from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    
    path('folder-list/', views.folderList, name='folder-list'),
    path('folder-create/', views.folderCreate, name='folder-create'),
    path('folder-delete/', views.folderDelete, name='folder-delete'),

    path('folder/task-list/', views.taskList, name='task-list'),
    path('folder/task-create/', views.taskCreate, name='task-create'),
    path('folder/task-update/', views.taskUpdate, name='task-update'),
    path('folder/task-delete/', views.taskDelete, name='task-delete'),
]

