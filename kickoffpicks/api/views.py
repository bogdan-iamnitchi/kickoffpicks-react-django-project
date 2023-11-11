from rest_framework.views import APIView
from rest_framework import generics, status
from .serializers import RoomSerializer
from .models import Room

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer