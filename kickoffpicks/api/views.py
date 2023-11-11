from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from .business_logic import *

class GetRoom(APIView):
    serializer_class = RoomSerializer
    
    def get(self, request, format = None):
        rooms = get_rooms_bll(request)
        if len(rooms) > 0:
            return Response(RoomSerializer(rooms, many=True).data, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Rooms not found..."}, status=status.HTTP_404_NOT_FOUND)

class CreateRoom(APIView):
    serializer_class = CreateRoomSerializer
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        room = create_room_bll(request, self.serializer_class)
        if room:
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        else:
            return Response({"Error": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)