from django.urls import path
from . import views


urlpatterns = [
    path('', views.minute_list),
    path('main/', views.minute_main),
    path('create/', views.minute_create),
    path('<int:minute_pk>/', views.minute_detail),
    path('<int:minute_pk>/delete/', views.minute_delete),
    path('<int:minute_pk>/update/', views.minute_update),
    path('<int:minute_pk>/close/', views.minute_close),
    # minute 파일 다운로드
    path('<int:minute_pk>/download/<int:reference_file_pk>/', views.minute_file_download),
    path('<int:minute_pk>/speech/create/', views.speech_create),
    path('<int:minute_pk>/speech/<int:speech_pk>/', views.speech_detail),
    path('<int:minute_pk>/speech/<int:speech_pk>/delete/', views.speech_delete),
    path('<int:minute_pk>/speech/<int:speech_pk>/update/', views.speech_update),
    # speech 파일 다운로드
    path('<int:minute_pk>/speech/<int:speech_pk>/download/<int:reference_file_pk>/', views.speech_file_download),
    path('<int:minute_pk>/speech/<int:speech_pk>/comment/create/', views.speech_comment_create),
    path('<int:minute_pk>/speech/<int:speech_pk>/comment/<int:comment_pk>/delete/', views.speech_comment_delete),
    path('<int:minute_pk>/speech/<int:speech_pk>/comment/<int:comment_pk>/update/', views.speech_comment_update),
]
