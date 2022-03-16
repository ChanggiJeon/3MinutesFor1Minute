from django.urls import path
from . import views

app_name='community'
urlpatterns = [
    path('create/', views.community_create),
    path('<int:community_pk>/', views.community_detail_update_or_delete),
]