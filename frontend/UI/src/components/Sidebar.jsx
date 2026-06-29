import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Sidebar({
    setMessages,
    setSelectedChat,
    selectedChat,
    sidebarOpen,
    setSidebarOpen,
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

    // Load selected chat
    const loadChat = async (chatId) => {
        try {
            const response = await api.get(`/chats/${chatId}/`);

            setSelectedChat(response.data);
            setMessages(response.data.messages);

            // Close sidebar on mobile
            setSidebarOpen(false);
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
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

            {/* Logo */}
            <div className="text-center mb-4">
                <h3 className="fw-bold m-0">
                    <span className="text-danger">C</span>rack
                    <span className="text-danger">C</span>ode
                </h3>
                <small className="text-secondary">
                    AI Assistant
                </small>
            </div>

            {/* New Chat */}
            <button
                className="btn btn-light w-100 mb-3 fw-semibold"
                onClick={() => {
                    setSelectedChat(null);
                    setMessages([]);
                    setSidebarOpen(false);
                }}
            >
                <i className="bi bi-plus-circle me-2"></i>
                New Chat
            </button>

            {/* Chat List */}
            <div className="flex-grow-1 overflow-auto">

                {chats.length === 0 ? (

                    <div className="text-center text-muted mt-4">
                        No chats found
                    </div>

                ) : (

                    chats.map((chat) => (

                        <div
                            key={chat.id}
                            onClick={() => loadChat(chat.id)}
                            className={`chat-item ${selectedChat?.id === chat.id
                                    ? "active"
                                    : ""
                                }`}
                        >

                            <div
                                className="flex-grow-1 text-truncate"
                                title={chat.title}
                            >
                                <i className="bi bi-chat-left-text me-2"></i>
                                {chat.title}
                            </div>

                            <button
                                className="btn btn-sm btn-link text-danger p-0 ms-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChat(chat.id);
                                }}
                            >
                                <i className="bi bi-trash"></i>
                            </button>

                        </div>

                    ))

                )}

            </div>

            {/* Logout */}
            <button
                className="btn btn-danger mt-3 w-100"
                onClick={handleLogout}
            >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
            </button>

        </div>
    );
}