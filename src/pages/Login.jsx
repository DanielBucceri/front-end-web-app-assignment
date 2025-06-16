import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import api from "../services/api";
import "../styles/cards.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        
        // Validation check
        if (!username || !password) {
            setError("Please enter both username and password");
            setLoading(false);
            return;
        }
        try {
            const response = await api.post("/users/login", {
                username,
                password
            });
            
            const token = response.data.token;
            setToken(token);
            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Login has failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="auth-form">
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    
                    <div className="auth-footer">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;