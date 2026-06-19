from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated

from .models import ChatSession, Message
from .services import get_gemini_response

from .serializers import (
    RegisterSerializer,
    ChatSessionSerializer,
    ChatDetailSerializer
)

# Create your views here.


class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })
    
class ChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user_message = request.data.get("message")

        if not user_message:
            return Response(
                {"error": "Message is required"},
                status=400
            )

        session_id = request.data.get("session_id")

        if session_id:
            try:
                session = ChatSession.objects.get(
                    id=session_id,
                    user=request.user
                )
            except ChatSession.DoesNotExist:
                return Response(
                    {"error": "Chat session not found"},
                    status=404
                )
        else:
            session = ChatSession.objects.create(
                user=request.user,
                title=user_message[:20]
            )

        # Save User Message
        Message.objects.create(
            session=session,
            role="user",
            content=user_message
        )

        # Gemini Response
        try:
            ai_response = get_gemini_response(
                user_message
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )

        # Save AI Response
        Message.objects.create(
            session=session,
            role="assistant",
            content=ai_response
        )

        return Response({
            "session_id": session.id,
            "response": ai_response
        })

    
class ChatListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        chats = ChatSession.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = ChatSessionSerializer(
            chats,
            many=True
        )

        return Response(serializer.data)
    
class ChatDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        chat = ChatSession.objects.get(
            id=pk,
            user=request.user
        )

        serializer = ChatDetailSerializer(
            chat
        )

        return Response(serializer.data)
    
class DeleteChatView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        try:
            chat = ChatSession.objects.get(
                id=pk,
                user=request.user
            )
        except ChatSession.DoesNotExist:
            return Response(
                {"error": "Chat not found"},
                status=404
            )

        chat.delete()

        return Response({
            "message": "Chat deleted successfully"
        })