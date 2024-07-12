import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
      ],
    },
  ]);
  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
};

export default Router;
