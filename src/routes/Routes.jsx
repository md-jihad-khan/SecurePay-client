import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../layouts/Main";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
