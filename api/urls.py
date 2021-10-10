from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('folder-list/', views.folderList, name='folder-list'),
    path('folder-create/', views.folderCreate, name='folder-create'),
    path('folder-list/<str:pk>/task-list/', views.taskList, name='task-list'),   
    path('folder-list/<str:pk>/task-create/', views.taskCreate, name='task-create'),
    path('folder-list/task-update/<str:pk>/', views.taskUpdate, name='task-update'),
    path('folder-list/task-delete/<str:pk>/', views.taskDelete, name='task-delete'),
]

