import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import api from "../services/api";
import "../styles/auth.css";

const RegisterTest = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        
        // Validation check
        if (!username || !password || !confirmPassword) {
            setError("Please complete all fields");
            setLoading(false);
            return;
        }
        try {
            const response = await api.post("/users/register", {
                username,
                password
            });
            
            const token = response.data.token;
            setToken(token);
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Registration has failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>
                <form onSubmit={handleRegister} className="auth-form">
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="username">username</label>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={loading} 
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    
                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterTest;