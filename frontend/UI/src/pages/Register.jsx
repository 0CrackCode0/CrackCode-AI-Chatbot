import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await api.post("register/", { username, email, password });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.detail || "Registration failed!");
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-lg p-4" style={{ width: "420px" }}>
                <h2 className="text-center mb-4">Create Account</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <input
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary w-100" onClick={handleRegister}>
                    Register
                </button>

                <p className="text-center mt-3">
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
}