from django.urls import path
from .views import *

urlpatterns = [
    path('all-rooms/', RoomView.as_view()),
    path('create-room/', CreateRoom.as_view()),
    path('join-room/', JoinRoom.as_view()),
    path('get-room/', GetRoom.as_view()),
    path('update-room/', UpdateRoom.as_view()),
    path('user-in-room/', UserInRoom.as_view()),
    path('leave-room/', LeaveRoom.as_view()),
    
    path('start-room/', StartRoom.as_view()),
    path('status-room/', RoomStatus.as_view()),
    path('end-room/', EndRoom.as_view()),
    
    path('<str:room_code>/', RoomView.as_view()),
]
