from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics

from .serializers import QuestionSerializer
from .models import Question

import csv
import os

# Create your views here.
class AllQuestions(APIView):
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        
        questions = Question.objects.all();
        
        if len(questions) > 0:
            return Response(QuestionSerializer(questions, many=True).data, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Questions not found..."}, status=status.HTTP_404_NOT_FOUND)
        

class PopulateQuestions(APIView):
    serializer_class = QuestionSerializer
    
    def post(self, request, format=None):
        file_path = os.path.join(os.path.dirname(__file__), 'questions.csv')
        
        try:
            self.populate_questions(file_path)
            return Response({"Success": "Questions created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Exception: ", e)
            return Response({"Error": "Questions not created..."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def populate_questions(self, file_path):
        with open(file_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                question_text = row['question_text']

                if not Question.objects.filter(question_text=question_text).exists():
                    question = Question(
                        room_code=row['room_code'],
                        question_text=question_text,
                        choice1=row['choice1'],
                        choice2=row['choice2'],
                        choice3=row['choice3'],
                        correct_choice=row['correct_choice'],
                    )
                    question.save()


class CreateQuestion(APIView):
    serializer_class = QuestionSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            question_text = serializer.validated_data.get('question_text')

            if not Question.objects.filter(question_text=question_text).exists():
                serializer.save()
                return Response({"Success": "Question created successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"Error": "Question with the same text already exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"Error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        
class QuestionDetail(APIView):
    serializer_class = QuestionSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, *args, **kwargs):
        question_id = request.GET.get(self.lookup_url_kwarg)
        try:
            question = Question.objects.get(id=question_id)
            return Response(QuestionSerializer(question).data, status=status.HTTP_200_OK)
        except Exception as e:
            print("Exception: ", e)
            return Response({"Error": "Question not found..."}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, *args, **kwargs):
        question_id = request.GET.get(self.lookup_url_kwarg)
        question = Question.objects.get(id=question_id)
        
        serializer = self.serializer_class(question, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"Success": "Question updated successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        
class FirstQuestion(APIView):
    serializer_class = QuestionSerializer

    def get(self, request, room_code, *args, **kwargs):
        print(room_code)      
        try:
            question = Question.objects.filter(room_code=room_code).first()
            return Response(QuestionSerializer(question).data, status=status.HTTP_200_OK)
        except Exception as e:
            print("Exception: ", e)
            return Response({"Error": "Question not found..."}, status=status.HTTP_404_NOT_FOUND)
        
class RoomQuestion(APIView):
    
    def get(self, request, room_code, *args, **kwargs):
        
        current_question_id = request.session.get(f'{room_code}_current_question_id')
        next_question = self.get_next_question(current_question_id, room_code)

        if next_question:
            request.session[f'{room_code}_current_question_id'] = next_question.id

            serializer = QuestionSerializer(next_question)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No more questions available for this room"}, status=status.HTTP_404_NOT_FOUND)

    def get_next_question(self, current_question_id, room_code):
        queryset = Question.objects.filter(room_code=room_code)
        
        if current_question_id is None:
            return queryset.first().id
        else:
            return queryset.filter(id__gt=current_question_id).first()
        
class StartQuestion(APIView):
    def get(self, request, room_code, *args, **kwargs):
        
        request.session.pop(f'{room_code}_current_question_id', None)

        first_question = Question.objects.filter(room_code=room_code).first()

        if first_question:
            request.session[f'{room_code}_current_question_id'] = first_question.id

            serializer = QuestionSerializer(first_question)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No questions available for this room"}, status=status.HTTP_404_NOT_FOUND)
        

class CurrentQuestion(APIView):
    def get(self, request, room_code, *args, **kwargs):
        current_question_id = request.session.get(f'{room_code}_current_question_id')
        
        if current_question_id is not None:
            current_question = Question.objects.get(id=current_question_id)
            serializer = QuestionSerializer(current_question)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No current question available for this room"}, status=status.HTTP_404_NOT_FOUND)

class DeleteQuestion(APIView):
    def delete(self, request, room_code, *args, **kwargs):
        try:
            Question.objects.filter(room_code=room_code).delete()
            return Response({"Success": "Questions deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Exception: ", e)
            return Response({"Error": "Questions not deleted..."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class NrOfQuestionsInRoom(APIView):
    def get(self, request, room_code, format=None):
        nr_of_questions = Question.objects.filter(room_code=room_code).count()
        return Response({"nr_of_questions": nr_of_questions}, status=status.HTTP_200_OK)
    

class CheckCurrentQuestion(APIView):
    def get(self, request, room_code, *args, **kwargs):
        current_question_id = request.session.get(f'{room_code}_current_question_id')

        if current_question_id is not None:
            return Response({"exists": True, "current_question_id": current_question_id}, status=status.HTTP_200_OK)
        else:
            return Response({"exists": False, "message": "No current question in session for this room"}, status=status.HTTP_404_NOT_FOUND)
        

class UpdateQuestionPoints(APIView):
    def post(self, request, room_code, current_index, *args, **kwargs):
        try:
            question = Question.objects.get(room_code=room_code, current_index=current_index)

            passQuestion = request.data.get('pass_question')
            if(passQuestion):
                question.points = 0
                question.save()
                serializer = QuestionSerializer(question)
                return Response(serializer.data, status=status.HTTP_200_OK)
                

            is_correct = question.is_correct(request.data.get('answer'))

            question.points = 10 if is_correct else 0
            question.save()

            serializer = QuestionSerializer(question)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Question.DoesNotExist:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print("Exception: ", e)
            return Response({"error": "Failed to update question score"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class FinalScore(APIView):
    def get(self, request, room_code, *args, **kwargs):
        try:
            # Retrieve all questions for the given room code
            questions = Question.objects.filter(room_code=room_code)

            # Calculate the final score by summing up individual question scores
            final_score = sum(question.points for question in questions)

            return Response({"final_score": final_score}, status=status.HTTP_200_OK)

        except Exception as e:
            print("Exception: ", e)
            return Response({"error": "Failed to calculate final score"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)