import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MessageBubble from "../components/MessageBubble";
import api from "../services/api";

export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const [input, setInput] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Send message to backend
    const sendMessage = async () => {

        if (!input.trim()) return;

        try {

            setLoading(true);

            const payload = {
                message: input
            };

            // continue existing chat if selected
            if (selectedChat) {
                payload.session_id = selectedChat.id;
            }

            const response = await api.post(
                "/chat/",
                payload
            );

            const chatId = response.data.session_id;

            // reload full chat after AI response
            const chatResponse = await api.get(
                `/chats/${chatId}/`
            );

            setSelectedChat(chatResponse.data);
            setMessages(chatResponse.data.messages);

            setInput("");

        } catch (error) {

            console.error(error);
            alert("Failed to send message");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex" style={{ height: "100vh" }}>

            {/* Sidebar */}
            <Sidebar
                setMessages={setMessages}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Overlay (mobile only) */}
            {sidebarOpen && (
                <div
                    className="overlay d-md-none"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Chat Area */}
            <div className="flex-grow-1 d-flex flex-column">

                {/* Header */}
                <Navbar
                    selectedChat={selectedChat}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Messages */}
                <div
                    className="flex-grow-1 p-4 overflow-auto"
                    style={{ backgroundColor: "#f8f9fa" }}
                >

                    {messages.length === 0 ? (
                        <div className="text-center mt-5 text-muted">
                            <h4>Welcome to <h2 className="text-center mb-3 fw-bold">
                                <span style={{ color: "#dc3545", textShadow: "0 0 10px rgba(220,53,69,0.5)" }}>
                                    C
                                </span>
                                rack
                                <span style={{ color: "#dc3545", textShadow: "0 0 10px rgba(220,53,69,0.5)" }}>
                                    C
                                </span>
                                ode
                            </h2></h4>
                            <p>Designed and developed by Abdul Ahad</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                role={msg.role}
                                content={msg.content}
                            />
                        ))
                    )}

                    {loading && (
                        <div className="text-muted mt-3">
                            CrackCode AI is typing...
                        </div>
                    )}

                </div>

                {/* Input Box */}
                <div className="border-top p-3 bg-white">

                    <div className="input-group">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={sendMessage}
                            disabled={loading}
                        >
                            {loading ? "..." : "Send"}
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}