from django.urls import path
from .views import *

urlpatterns = [
    path('all-rooms/', RoomView.as_view()),
    path('get-room/', GetRoom.as_view()),
    path('create-room/', CreateRoom.as_view()),
    
    path('<str:room_code>/', RoomView.as_view()),
]
