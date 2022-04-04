from django.urls import path
from . import views


urlpatterns = [
    path('', views.board_list),
    path('create/', views.board_create),
    path('<int:board_pk>/', views.board_detail),
    path('<int:board_pk>/delete/', views.board_delete),
    path('<int:board_pk>/update/', views.board_update),
    # 게시글 파일 다운로드
    path('<int:board_pk>/download/<int:reference_file_pk>/', views.board_file_download),
    path('<int:board_pk>/comment/create/', views.board_comment_create),
    path('<int:board_pk>/comment/<int:comment_pk>/delete/', views.board_comment_delete),
    path('<int:board_pk>/comment/<int:comment_pk>/update/', views.board_comment_update),
]
