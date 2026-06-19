import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Sidebar({
    setMessages,
    setSelectedChat,
    selectedChat
}) {

    const navigate = useNavigate();
    const [chats, setChats] = useState([]);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
    };

    // Fetch all chats
    const fetchChats = async () => {
        try {
            const response = await api.get("/chats/");
            setChats(response.data);
        } catch (error) {
            console.error("Error loading chats:", error);
        }
    };

    // Load single chat messages
    const loadChat = async (chatId) => {
        try {
            const response = await api.get(`/chats/${chatId}/`);

            setSelectedChat(response.data);
            setMessages(response.data.messages);

        } catch (error) {
            console.error("Error loading chat:", error);
        }
    };

    // Delete chat
    const deleteChat = async (chatId) => {

        const confirmDelete = window.confirm(
            "Delete this chat?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/chats/${chatId}/delete/`);

            fetchChats();

            if (selectedChat?.id === chatId) {
                setSelectedChat(null);
                setMessages([]);
            }

        } catch (error) {
            console.error(error);
            alert("Failed to delete chat");
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div
            className="bg-dark text-white d-flex flex-column p-3"
            style={{
                width: "280px",
                minWidth: "280px",
                maxWidth: "280px",
                height: "100vh",
                flexShrink: 0
            }}
        >

            {/* Header */}
            <h4 className="text-center mb-3 fw-bold">
                <span style={{ color: "#dc3545", textShadow: "0 0 10px rgba(220,53,69,0.5)" }}>
                    C
                </span>
                rack
                <span style={{ color: "#dc3545", textShadow: "0 0 10px rgba(220,53,69,0.5)" }}>
                    C
                </span>
                ode
            </h4>

            {/* New Chat */}
            <button
                className="btn btn-light w-100 mb-3"
                onClick={() => {
                    setSelectedChat(null);
                    setMessages([]);
                }}
            >
                + New Chat
            </button>

            {/* Chat List */}
            <div className="flex-grow-1 overflow-auto">

                {chats.length === 0 ? (
                    <p className="text-muted">
                        No chats found
                    </p>
                ) : (
                    chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => loadChat(chat.id)}
                            className="p-2 rounded mb-2 bg-secondary d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer" }}
                        >

                            {/* Title */}
                            <span>
                                {chat.title}
                            </span>

                            {/* Delete */}
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChat(chat.id);
                                }}
                                style={{
                                    cursor: "pointer",
                                    color: "#ff4d4f"
                                }}
                            >
                                <i className="bi bi-trash"></i>
                            </span>

                        </div>
                    ))
                )}

            </div>

            {/* Logout */}
            <button
                className="btn btn-danger mt-3"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>
    );
}