from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ChatSession, Message


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = [
            "id",
            "role",
            "content",
            "created_at"
        ]

class ChatSessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChatSession
        fields = [
            "id",
            "title",
            "created_at"
        ]

class ChatDetailSerializer(serializers.ModelSerializer):

    messages = MessageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = ChatSession
        fields = [
            "id",
            "title",
            "created_at",
            "messages"
        ]