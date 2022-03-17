from django.urls import path
from . import views

app_name='community'
urlpatterns = [
    # 커뮤니티 생성
    path('create/', views.community_create),
    path('uniquecheck/community_name', views.uniquecheck_commnity_name),
    # 가입 신청
    path('join/<int:community_pk>',views.community_join),
    path('search/code/', views.search_for_code),
    path('search/name/', views.search_for_name),
    path('uniquecheck/<int:community_pk>/nickname', views.uniquecheck_member_nickname),
    # 커뮤니티 조회, 수정, 삭제
    path('<int:community_pk>/', views.community_detail_update_or_delete),
]