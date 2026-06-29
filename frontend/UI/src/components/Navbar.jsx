export default function Navbar({

    selectedChat,
    setSidebarOpen

}) {

    return (

        <div className="navbar-custom">

            <div className="d-flex align-items-center">

                <button
                    className="btn btn-light d-lg-none me-3"
                    onClick={() => setSidebarOpen(true)}
                >
                    <i className="bi bi-list fs-4"></i>
                </button>

                <span className="fw-bold fs-5">

                    <span className="text-danger">C</span>rack

                    <span className="text-danger">C</span>ode

                </span>

                {selectedChat && (

                    <span className="ms-3 text-muted">

                        Chat #{selectedChat.id}

                    </span>

                )}

            </div>

        </div>

    );

}