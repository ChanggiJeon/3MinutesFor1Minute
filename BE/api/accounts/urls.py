from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('signup/', views.signup),
    path('delete/<username>/', views.delete),
    path('uniquecheck/username/<username>/', views.unique_check_username),
    path('uniquecheck/email/<email>/', views.unique_check_email),
]
