from django.urls import path

from .views import (
    RegisterView,
    ProfileView,
    ChatView,
    ChatListView,
    ChatDetailView,
    DeleteChatView
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("chat/", ChatView.as_view()),

    path("chats/", ChatListView.as_view()),
    path("chats/<int:pk>/", ChatDetailView.as_view()),
    path("chats/<int:pk>/delete/", DeleteChatView.as_view()),
]