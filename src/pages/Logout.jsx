import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider'; 

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null); // Clear the token
    navigate('/login', { replace: true }); // Redirect to login page
  };

  // Simulate logout action
  setTimeout(() => {
    handleLogout();
  }, 1000);

  return "Logout Page";
}

export default Logout;