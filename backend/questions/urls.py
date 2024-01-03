from django.urls import path
from .views import *

urlpatterns = [
    path('populate-questions/', PopulateQuestions.as_view()),
    path('question/', QuestionDetail.as_view()),
    
    path('all-questions/', AllQuestions.as_view()),
    path('create-question/', CreateQuestion.as_view()),
    
    
    path('start-question/<str:room_code>', StartQuestion.as_view()),
    path('current-question/<str:room_code>', CurrentQuestion.as_view()),
    path('room-question/<str:room_code>', RoomQuestion.as_view()),
    path('delete-question/<str:room_code>', DeleteQuestion.as_view()),
    
    path('answer-question/<str:room_code>/<int:current_index>', UpdateQuestionPoints.as_view()),
    
    path('first-question/<str:room_code>', CheckCurrentQuestion.as_view()),
    path('nr-of-questions/<str:room_code>', NrOfQuestionsInRoom.as_view()),
]
