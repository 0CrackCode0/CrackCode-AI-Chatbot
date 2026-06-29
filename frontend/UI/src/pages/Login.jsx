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
        <div className="login-page">

            <div className="login-card">

                <h2 className="login-title">
                    <span className="text-danger">C</span>rack
                    <span className="text-danger">C</span>ode
                </h2>

                <p className="login-subtitle">
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

                <p className="login-footer">

                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>

                    <br />

                    <span className="developer">
                        Designed & Developed by{" "}
                        <a
                            href="https://www.linkedin.com/in/0abdulahad0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Abdul Ahad
                        </a>
                    </span>

                </p>

            </div>

        </div>
    );
}