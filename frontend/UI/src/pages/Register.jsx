import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
            <div
                className="card shadow-lg p-4"
                style={{ width: "420px" }}
            >
                <h2 className="text-center mb-4">
                    Create Account
                </h2>

                <input
                    className="form-control mb-3"
                    placeholder="Username"
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                />

                <button className="btn btn-primary w-100">
                    Register
                </button>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}