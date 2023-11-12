from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from .room_bll import *

class RoomView(APIView):
    serializer_class = RoomSerializer

    def get(self, request, *args, **kwargs):
        room_code = kwargs.get('room_code')
        
        if room_code:
            rooms = get_room_by_code(room_code)
        else:
            rooms = get_rooms_bll(request)
        
        if len(rooms) > 0:
            return Response(RoomSerializer(rooms, many=True).data, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Rooms not found..."}, status=status.HTTP_404_NOT_FOUND)

        
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    
    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            queryset = Room.objects.filter(code=code)
            if len(queryset) > 0:
                room = queryset[0]
                data = RoomSerializer(room).data
                data['is_host'] = self.request.session.session_key == room.host
                return Response(data, status=status.HTTP_200_OK)
            return Response({"Room Not Found": "Invalid room code."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"Bad Request":"Code parameter not found in request."}, status=status.HTTP_400_BAD_REQUEST)


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