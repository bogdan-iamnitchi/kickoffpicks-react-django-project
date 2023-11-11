from django.urls import path
from .views import *

urlpatterns = [
    path('get-rooms/', GetRoom.as_view()),
    path('create-room/', CreateRoom.as_view()),
]
