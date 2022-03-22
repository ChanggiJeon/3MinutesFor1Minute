from django.urls import path
from . import views

# 프로필 이미지 전용
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "accounts"
urlpatterns = [
    path('signup/', views.signup),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('delete/', views.delete),
    path('uniquecheck/username/', views.unique_check_username),
    path('uniquecheck/email/', views.unique_check_email),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)