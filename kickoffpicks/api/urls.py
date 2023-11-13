from django.urls import path
from .views import *

urlpatterns = [
    path('rooms/', RoomView.as_view()),
    path('rooms/<str:room_code>/', RoomView.as_view()),
    path('create-room/', CreateRoom.as_view()),
    path('get-room-details/', GetRoom.as_view()),
]
