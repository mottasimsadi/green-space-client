import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, path: "/", Component: Home },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/forget-password", Component: ForgetPassword },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;
