import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MessageBubble from "../components/MessageBubble";
import api from "../services/api";

export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sendMessage = async () => {

        if (!input.trim()) return;

        try {

            setLoading(true);

            const payload = {
                message: input
            };

            if (selectedChat) {
                payload.session_id = selectedChat.id;
            }

            const response = await api.post("/chat/", payload);

            const chatResponse = await api.get(
                `/chats/${response.data.session_id}/`
            );

            setSelectedChat(chatResponse.data);
            setMessages(chatResponse.data.messages);

            setInput("");

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="chat-layout">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                setMessages={setMessages}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
            />

            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="chat-container">

                <Navbar
                    selectedChat={selectedChat}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="messages-area">

                    {messages.length === 0 ? (

                        <div className="welcome">

                            <h2>
                                <span className="text-danger">C</span>rack
                                <span className="text-danger">C</span>ode
                            </h2>

                            <p>Designed and Developed by Abdul Ahad</p>

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
                        <p className="text-muted mt-3">
                            CrackCode AI is typing...
                        </p>
                    )}

                </div>

                <div className="chat-input">

                    <div className="input-group">

                        <input
                            className="form-control"
                            placeholder="Type message..."
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
                            disabled={loading}
                            onClick={sendMessage}
                        >
                            {loading ? "..." : "Send"}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}