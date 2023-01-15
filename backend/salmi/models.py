from django.db import models


class Word(models.Model):
    word = models.CharField(max_length=50)
    word_fr = models.CharField(max_length=50)
    word_en = models.CharField(max_length=50)
    created_at = models.IntegerField()
    definition = models.TextField()


class Context(models.Model):
    context = models.TextField(null=False)
    keywords = models.TextField()
    ref = models.TextField()
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
