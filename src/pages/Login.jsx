import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        setToken("test Token");
        navigate("/", { replace: true });
    };
    
    setTimeout(() => {
        handleLogin();
    }, 1000);
    return <>Login Page</>;
};

export default login;