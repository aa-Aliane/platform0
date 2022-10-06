from django.shortcuts import render
from .models import Word, Context
from .serializers import WordSerializer, ContextSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes






class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]

    
class ContextViewSet(viewsets.ModelViewSet):
    queryset = Context.objects.all()
    serializer_class = ContextSerializer
    permission_classes = [permissions.AllowAny]
    

@api_view(['POST'])
def get_context(request):
    word = Word.objects.get(id = request.data['word_id'])
    context = Context.objects.filter(word = request.data['word_id'])
    response = ContextSerializer(context, many=True)
    
    return Response(status=status.HTTP_200_OK, data=response.data)

@api_view(['POST'])   
def post_context(request):
    serializer = ContextSerializer
    word = Word.objects.get(id = request.data['word_id'])
    context = Context.objects.create(
        context = request.data['context'],
        keywords = request.data['keywords'],
        ref = request.data['ref'],
        word = word
    )
    context.save()
    
    
    return Response(status=status.HTTP_200_OK, data='context created successfuly')
    

    
   