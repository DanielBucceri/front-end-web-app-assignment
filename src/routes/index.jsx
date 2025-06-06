import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import ProtectedRoute from "../components/protectedRoute";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register"; 


const Routes = () => {
    const { token } = useAuth();

    //publiuc routes
  const routesForNotAuthenticated = [
    { path: "/", element: <div>Home Page</div>},
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];

    //authenticated routes
  const routesForAuthenticatedOnly = [
    {
      element: <ProtectedRoute />,
      path: "/",
      children: [
        {path : "/", element: <div>Authenticated!</div>},
        // { path: "/builds", element: <Builds /> },
        // {path: "/teams", element: <Teams /> },
        // { path: "/teams/:id", element: <OneTeam /> },
        // { path: "/teams/:id/available-builds", element: <AvailableBuilds /> },
        { path: "/logout", element: <Logout /> },
      ],
    },
  ];

    // Combine all routes
  const router = createBrowserRouter([
  ...(!token ? routesForNotAuthenticated : []),
  ...routesForAuthenticatedOnly,
]);
return <RouterProvider router={router} />;

}

export default Routes;