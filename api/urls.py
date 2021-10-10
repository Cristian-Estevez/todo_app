from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    
    path('folder-list/', views.folderList, name='folder-list'),
    path('folder-create/', views.folderCreate, name='folder-create'),
    path('folder-delete/<str:pk>/', views.folderDelete, name='folder-delete'),

    path('folder/<str:pk>/task-list/', views.taskList, name='task-list'),   
    path('folder/<str:pk>/task-create/', views.taskCreate, name='task-create'),
    path('folder/<str:folder_pk>/task-update/<str:pk>/', views.taskUpdate, name='task-update'),
    path('folder/<str:folder_pk>/task-delete/<str:pk>/', views.taskDelete, name='task-delete'),
]

