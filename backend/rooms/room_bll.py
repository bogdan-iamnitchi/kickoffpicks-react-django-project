from rest_framework.response import Response
from .models import Room

def get_rooms_bll(request):
    rooms = Room.objects.all()
    return rooms

def get_room_by_host(host):
    room = Room.objects.filter(host=host)
    return room

def get_room_by_code(code):
    room = Room.objects.filter(code=code)
    return room

def create_or_update_room_bll(request, serializer_class):
    serializer = serializer_class(data=request.data)
    if serializer.is_valid():
        host = request.session.session_key
        max_players = serializer.data.get('max_players')
        votes_to_skip = serializer.data.get('votes_to_skip')
        
        rooms = get_room_by_host(host)
        if len(rooms) > 0:
            room = rooms[0]
            
            request.session["room_code"] = room.code
            room.max_players = max_players
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['max_players', 'votes_to_skip'])
        else:
            room = Room(host=host, max_players=max_players, votes_to_skip=votes_to_skip)
            request.session["room_code"] = room.code
            room.save()
        return room
    return None
            
