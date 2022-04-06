from django.urls import path
from . import views


urlpatterns = [
    path('', views.community_list),
    path('<int:community_pk>/self/', views.self),
    path('<int:community_pk>/profile/<nickname>/', views.profile),
    # 커뮤니티 생성
    path('create/', views.community_create),
    path('uniquecheck/community_name/<community_name>/', views.uniquecheck_community_name),
    # 가입 신청
    path('apply/<int:community_pk>/', views.community_apply),
    path('search/code/<code>/', views.search_for_code),
    path('search/name/<keyword>/', views.search_for_name),
    path('uniquecheck/<int:community_pk>/nickname/<nickname>/', views.uniquecheck_member_nickname),
    # 가입 승인
    path('<int:community_pk>/waitinglist/', views.members_get_waiting),
    path('<int:community_pk>/waitinglist/<int:member_pk>/approval/', views.approve_waiting_member),
    # 커뮤니티 조회, 수정, 삭제
    path('<int:community_pk>/', views.community_detail_update_delete),
    # 멤버 조회
    path('<int:community_pk>/member/', views.community_get_members),
    # 멤버 초대
    path('invite/<int:community_pk>/<int:user_pk>/', views.invite_user),
    path('invite/search/<keyword>/', views.find_user),
    # 멤버 수정, 삭제
    path('<int:community_pk>/member/<int:member_pk>/update/', views.member_update),
    path('<int:community_pk>/member/<int:member_pk>/withdraw/', views.member_delete),
]
