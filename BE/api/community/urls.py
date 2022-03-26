from django.urls import path
from . import views


urlpatterns = [
    # 커뮤니티 생성
    path('create/', views.community_create),
    path('uniquecheck/community_name/<community_name>/', views.uniquecheck_community_name),
    # 가입 신청
    path('apply/<int:community_pk>/', views.community_apply),
    path('search/code/<code>/', views.search_for_code),
    path('search/name/<keyword>/', views.search_for_name),
    path('uniquecheck/<int:community_pk>/nickname/<nickname>/', views.uniquecheck_member_nickname),
    # 커뮤니티 조회, 수정, 삭제
    path('<int:community_pk>/', views.community_detail_update_or_delete),
    # 멤버 조회
    path('<int:community_pk>/member/', views.community_get_members),
    # 멤버 삭제
    path('<int:community_pk>/member/<int:member_pk>/', views.community_delete_member),
    # 멤버 초대
    path('invite/<int:community_pk>/<int:user_pk>/', views.invite_user),
    path('invite/search/<keyword>/', views.find_user),
    # 멤버 수정
    path('<int:community_pk>/member/<int:member_pk>/update/', views.member_update),
    path('<int:community_pk>/member/<int:member_pk>/withdraw/', views.member_withdraw),
]
