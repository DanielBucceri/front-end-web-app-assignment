import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

// Component to redirect authenticated users away from public routes like login/register
const PublicRoute = () => {
  const { token } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // If not authenticated, render the child routes (login/register)
  return <Outlet />;
};

export default PublicRoute;
