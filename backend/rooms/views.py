from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
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
            self.request.session.save()
            
        print("self.request.session.session_key: ", self.request.session.session_key)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            tournament = serializer.data.get('tournament')
            max_players = serializer.data.get('max_players')
            votes_to_skip = serializer.data.get('votes_to_skip')
            
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if len(queryset) > 0:
                room = queryset[0]
                self.request.session["room_code"] = room.code
                room.tournament = tournament
                room.max_players = max_players
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['tournament', 'max_players', 'votes_to_skip'])
            else:
                room = Room(host=host, tournament=tournament, max_players = max_players, votes_to_skip=votes_to_skip)
                self.request.session["room_code"] = room.code
                room.save()
            
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)
        

class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            max_players = serializer.data.get('max_players')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'msg': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

            room.max_players = max_players
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['max_players', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        code = request.data.get(self.lookup_url_kwarg)
        print("code: ", code)
        if code != None:
            rooms = get_room_by_code(code)
            if len(rooms) > 0:
                self.request.session["room_code"] = code
                return Response({"message" : "Room Joined!"}, status=status.HTTP_200_OK)
            return Response({"Room Not Found": "Invalid room code."}, status=status.HTTP_404_NOT_FOUND) 
            
        return Response({"Bad Request":"Code parameter not found in request."}, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data = {
            'code' : self.request.session.get('room_code'),
        }
        return Response(data, status=status.HTTP_200_OK)
    
class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code', None)
            host_id = self.request.session.session_key
            queryset = Room.objects.filter(host=host_id)
            if len(queryset) > 0:
                room = queryset[0]
                room.delete()
                return Response({"message" : "Success"}, status=status.HTTP_200_OK)
                
        return Response({"Bad Request":"Room code not found in session."}, status=status.HTTP_400_BAD_REQUEST)
    
class StartRoom(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        host_id = self.request.session.session_key
        queryset = Room.objects.filter(host=host_id)
        if len(queryset) > 0:
            room = queryset[0]
            room.started = True
            room.save(update_fields=['started'])
            return Response({"message" : "Success"}, status=status.HTTP_200_OK)
        
        return Response({"Bad Request":"Room not found"}, status=status.HTTP_400_BAD_REQUEST)
    
class RoomStatus(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            return Response({"message": "Session does not exist"}, status=status.HTTP_404_NOT_FOUND)
            
        host_id = self.request.session.session_key
        queryset = Room.objects.filter(host=host_id)
        
        if len(queryset) > 0:
            room = queryset[0]
            room_status = room.started
            return Response({"started": room_status}, status=status.HTTP_200_OK)
        
        return Response({"message": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
    
class EndRoom(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        host_id = self.request.session.session_key
        queryset = Room.objects.filter(host=host_id)
        if len(queryset) > 0:
            room = queryset[0]
            room.started = False
            room.save(update_fields=['started'])
            return Response({"message" : "Success"}, status=status.HTTP_200_OK)
        
        return Response({"Bad Request":"Room not found"}, status=status.HTTP_400_BAD_REQUEST)