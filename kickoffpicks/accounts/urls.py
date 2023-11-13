
from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path('', hello_world),
]
