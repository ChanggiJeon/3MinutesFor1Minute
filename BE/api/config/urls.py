from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="341 API",
      default_version="v1",
      description="341를 위한 API 문서",
      terms_of_service="https://forest-rotate-668.notion.site/API-7ade0d1288d14738bba5c6b5504d0413",
   ), 
   public=True,
   permission_classes=(permissions.AllowAny, ),
)

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api/accounts/', include('accounts.urls')),
   path('api/<int:community_pk>/boards/', include('boards.urls')),
   path('api/community/', include('community.urls')),
   path('api/<int:community_pk>/minutes/', include('minutes.urls')),
   path('api/notifications/', include('notifications.urls')),
]

if settings.DEBUG:
   urlpatterns += [
      re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
      re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
      re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   ]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
