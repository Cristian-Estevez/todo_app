from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('folder-list/', views.folderList, name='folder-list'),
    path('task-list/', views.taskList, name='task-list'),   
    path('task-create/', views.taskCreate, name='task-create'),
    path('task-update/<str:pk>/', views.taskUpdate, name='task-update'),
    path('task-delete/<str:pk>/', views.taskDelete, name='task-delete'),
]

