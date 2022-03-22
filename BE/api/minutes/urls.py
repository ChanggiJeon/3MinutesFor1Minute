from django.urls import path
from . import views


urlpatterns = [
    path('', views.minute_list),
    path('create/', views.minute_create),
    path('<int:minute_pk>/', views.minute_detail),
    path('<int:minute_pk>/delete/', views.minute_detail),
    path('<int:minute_pk>/update/', views.minute_detail),
    path('<int:minute_pk>/speech/create/', views.speech),
    path('<int:minute_pk>/speech/<int:speech_pk>/', views.speech),
    path('<int:minute_pk>/speech/<int:speech_pk>/delete/', views.speech),
    path('<int:minute_pk>/speech/<int:speech_pk>/update/', views.speech),
    path('<int:minute_pk>/speech/<int:speech_pk>/comment/create/', views.speech_comment),
    path('<int:minute_pk>/speech/<int:speech_pk>/comment/<int:comment_pk>/delete/', views.speech_comment),
    path('<int:minute_pk>/speech/<int:speech_pk>/comment/<int:comment_pk>/update/', views.speech_comment),
]
