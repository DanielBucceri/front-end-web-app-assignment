import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import ProtectedRoute from "../components/protectedRoute";
import PublicRoutes from "../components/publicRoutes";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register"; 
import Dashboard from "../pages/Dashboard"; 
import Builds from "../pages/Builds";
import CreateBuild from "../pages/CreateBuild";

const Routes = () => {
  const { token } = useAuth();
  
  const router = createBrowserRouter([
    {
      // public routes
      path: '/',
      element: <Layout />,
      children: [
        // Redirect root to appropriate page based on auth state
        {
          index: true,
          element: token ? (
            <Navigate to="dashboard" replace />
          ) : (
            <Navigate to="login" replace />
          ),
        },
        {
          element: <PublicRoutes />, //redirect to dashboard if user is authenticated
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
        {
          // protected routes - redirect to login if user is not authenticated
          element: <ProtectedRoute />,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "builds", element: <Builds /> },
            { path: "builds/create", element: <CreateBuild /> },
            { path: "logout", element: <Logout /> },
            
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;