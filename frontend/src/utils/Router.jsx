import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Userdata from "../pages/Userdata";
import UserProvider from "./Provider";
import Error from "../pages/ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "/user",
          element: <Userdata />,
        },
      ],
    },
  ]);
  return (
    <UserProvider>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </UserProvider>
  );
};

export default Router;
