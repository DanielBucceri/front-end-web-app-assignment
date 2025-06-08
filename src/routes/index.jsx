import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import ProtectedRoute from "../components/protectedRoute";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register"; 
import Dashboard from "../components/Dashboard"; 

const Routes = () => {
  const { token } = useAuth();

  const router = createBrowserRouter([
    {
      // public routes
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <div>Home Page</div> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          // protected routes
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