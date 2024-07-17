import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../layouts/Main";
import Register from "../pages/Register";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
