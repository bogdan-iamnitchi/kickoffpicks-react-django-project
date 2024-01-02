from django.urls import path
from .views import *

urlpatterns = [
    path('all-questions/', AllQuestions.as_view()),
    path('populate-questions/', PopulateQuestions.as_view()),
    path('create-question/', CreateQuestion.as_view()),
    
    path('question/', QuestionDetail.as_view()),
    
    path('start-question/<str:room_code>', StartRoom.as_view()),
    path('room-question/<str:room_code>', RoomQuestion.as_view())
]
