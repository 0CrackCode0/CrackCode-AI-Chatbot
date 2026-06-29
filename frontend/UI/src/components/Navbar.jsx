import { useNavigate } from "react-router-dom";

export default function Navbar({ selectedChat, setSidebarOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
    };

    return (
        <div className="border-bottom p-3 bg-white d-flex align-items-center justify-content-between shadow-sm">

            {/* Left - Hamburger (mobile) */}
            <button
                className="btn btn-sm btn-outline-secondary d-md-none"
                onClick={() => setSidebarOpen(prev => !prev)}
            >
                ☰
            </button>

            {/* Center - Logo + Chat Title */}
            <div className="d-flex align-items-center gap-2">
                <span className="fw-bold fs-5">
                    <span style={{ color: "#dc3545" }}>C</span>rack
                    <span style={{ color: "#dc3545" }}>C</span>ode
                </span>
                {selectedChat && (
                    <>
                        <span className="text-muted">|</span>
                        <span className="text-muted small">
                            Chat #{selectedChat.id}
                        </span>
                    </>
                )}
            </div>

            {/* Right - Logout */}
            <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>
    );
}