from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
]

