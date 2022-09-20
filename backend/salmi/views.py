from django.shortcuts import render
from .models import Word
from .serializers import WordSerializer
from rest_framework import viewsets, status, permissions






class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]

    
   