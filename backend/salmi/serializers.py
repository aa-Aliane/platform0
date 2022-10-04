from .models import Word, Context
from rest_framework import serializers


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = "__all__"
        
        
class ContextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Context
        fields = "__all__"