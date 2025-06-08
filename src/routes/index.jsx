import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import ProtectedRoute from "../components/protectedRoute";
import PublicRoutes from "../components/publicRoutes";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register"; 
import Dashboard from "../pages/Dashboard"; 

const Routes = () => {
  const { token } = useAuth();
  
  const router = createBrowserRouter([
    {
      // public routes
      path: '/',
      element: <Layout />,
      children: [
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
            { path: "logout", element: <Logout /> },
            
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;