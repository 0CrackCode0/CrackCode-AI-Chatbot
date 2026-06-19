import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {

            const response = await api.post("/login/", {
                username,
                password
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            navigate("/chat");

        } catch (error) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-light">

            <div className="card shadow-lg p-4" style={{ width: "420px" }}>

                <h2 className="text-center mb-3 fw-bold">
                    <span style={{ color: "#dc3545", textShadow: "0 0 10px rgba(220,53,69,0.5)" }}>
                        C
                    </span>
                    rack
                    <span style={{ color: "#dc3545", textShadow: "0 0 10px rgba(220,53,69,0.5)" }}>
                        C
                    </span>
                    ode
                </h2>

                <p className="text-center text-muted small mb-4">
                    Making every day productive
                </p>

                {error && (
                    <div className="alert alert-danger py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-3 small text-muted">

                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>

                    <br />

                    <span>
                        Designed & Developed by{" "}
                        <a
                            href="https://www.linkedin.com/in/0abdulahad0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                        >
                            Abdul Ahad
                        </a>
                    </span>

                </p>

            </div>

        </div>
    );
}