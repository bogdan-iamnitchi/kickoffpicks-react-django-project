# Generated by Django 4.2.6 on 2024-01-02 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_alter_question_correct_choice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='correct_choice',
            field=models.CharField(max_length=100, verbose_name='Correct Choice'),
        ),
    ]