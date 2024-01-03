from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Room
        fields = '__all__'
       
        
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Room
        fields = ('tournament', 'max_players', 'votes_to_skip')
       
        
class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    
    class Meta: 
        model = Room
        fields = ('max_players', 'votes_to_skip', 'code')