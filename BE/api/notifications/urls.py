from django.urls import path
from . import views


urlpatterns = [
    path('', views.notification_list),
    path('new/', views.notification_unread),
    path('<int:notification_pk>/', views.notification_detail),
    path('<int:notification_pk>/delete/', views.notification_delete),
]
