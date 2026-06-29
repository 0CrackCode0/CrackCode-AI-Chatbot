export default function Navbar({ selectedChat }) {
    return (
        <div className="border-bottom p-3 bg-white d-flex align-items-center justify-content-between shadow-sm">
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
        </div>
    );
}