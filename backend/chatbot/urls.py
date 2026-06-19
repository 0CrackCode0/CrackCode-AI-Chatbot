from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('core.urls')),

    path('api/login/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]

# Serve static files
urlpatterns += static(
    '/assets/',
    document_root=settings.BASE_DIR / 'dist' / 'assets'
)

# React routes
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]