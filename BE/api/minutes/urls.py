from django.urls import path
from . import views


urlpatterns = [
    path('', views.minute_list),
    path('create/', views.minute_list),
    path('<int:minute_pk>/', views.minute_detail),
    path('<int:minute_pk>/delete/', views.minute_detail),
    path('<int:minute_pk>/update/', views.minute_detail),
    path('<int:minute_pk>/comments/create/', views.minute_comment),
    path('<int:minute_pk>/comments/<int:comment_pk>/delete/', views.minute_comment),
    path('<int:minute_pk>/comments/<int:comment_pk>/update/', views.minute_comment),
]
