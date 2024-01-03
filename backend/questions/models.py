from django.db import models

# Create your models here.
class Question(models.Model):
    
    room_code = models.CharField(max_length=8, verbose_name="Room Code")
    current_index = models.IntegerField(verbose_name="Current Index", default=0)
    
    points = models.IntegerField(verbose_name="Points", default=0)
    
    question_text = models.CharField(max_length=255, verbose_name="Question")
    choice1 = models.CharField(max_length=100, verbose_name="Choice 1")
    choice2 = models.CharField(max_length=100, verbose_name="Choice 2")
    choice3 = models.CharField(max_length=100, verbose_name="Choice 3")
    correct_choice = models.CharField(max_length=100, verbose_name="Correct Choice", blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.correct_choice:
            self.correct_choice = self._get_correct_choice()
        super().save(*args, **kwargs)

    def _get_correct_choice(self):
        return {
            'choice1': self.choice1,
            'choice2': self.choice2,
            'choice3': self.choice3,
        }.get(self.correct_choice, None)
        
    def is_correct(self, user_answer):
        print("user_answer: ", user_answer)
        print("correct_choice: ", self.correct_choice)
        return user_answer == self.correct_choice

    def __str__(self):
        return self.question_text