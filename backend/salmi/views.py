from django.shortcuts import render
from .models import Word, Context
from .serializers import WordSerializer, ContextSerializer
from rest_framework import viewsets, status, permissions, authentication
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)


class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]


class ContextViewSet(viewsets.ModelViewSet):
    queryset = Context.objects.all()
    serializer_class = ContextSerializer
    permission_classes = [permissions.AllowAny]


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def login(request):
    return Response(status=status.HTTP_200_OK, data="logged")


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def get_context(request):
    word = Word.objects.get(id=request.data["word_id"])
    context = Context.objects.filter(word=request.data["word_id"])
    response = ContextSerializer(context, many=True)

    return Response(status=status.HTTP_200_OK, data=response.data)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def post_context(request):
    serializer = ContextSerializer
    word = Word.objects.get(id=request.data["word_id"])
    context = Context.objects.create(
        context=request.data["context"],
        keywords=request.data["keywords"],
        ref=request.data["ref"],
        word=word,
    )
    context.save()

    return Response(status=status.HTTP_200_OK, data="context created successfuly")


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def update_word(request):
    serializer = WordSerializer
    word = Word.objects.get(id=request.data["word_id"])
    word.word = request.data["word_ar"]
    word.word_en = request.data["word_en"]
    word.word_fr = request.data["word_fr"]

    contexts = Context.objects.filter(word=request.data["word_id"])
    for c in contexts:
        c.delete()

    for c in request.data["contexts"]:
        context = Context.objects.create(
            context=c["context"],
            keywords=c["keywords"],
            ref=c["ref"],
            word=word,
        )
        context.save()

    word.save()

    return Response(status=status.HTTP_200_OK, data="word updated successfuly")


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def post_word(request):
    serializer = WordSerializer
    word = Word.objects.create(
        word=request.data["word_ar"],
        word_en=request.data["word_en"],
        word_fr=request.data["word_fr"],
        created_at=0,
    )

    word.save()

    for c in request.data["contexts"]:
        context = Context.objects.create(
            context=c["context"],
            keywords=c["keywords"],
            ref=c["ref"],
            word=word,
        )
        context.save()

    return Response(status=status.HTTP_200_OK, data="word added successfuly")
