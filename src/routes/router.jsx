import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import ExploreGardeners from "../pages/ExploreGardeners";
import PrivateRoute from "../contexts/PrivateRoute";
import ShareTip from "../pages/ShareTip";
import BrowseTips from "../pages/BrowseTips";
import TipDetails from "../components/TipDetails";

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
      { path: "/explore-gardeners", Component: ExploreGardeners },
      {
        path: "/share-tips",
        element: (
          <PrivateRoute>
            <ShareTip></ShareTip>
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tips",
        element: (
          <PrivateRoute>
            <BrowseTips></BrowseTips>
          </PrivateRoute>
        ),
      },
      {
        path: "/tip-details/:id",
        element: (
          <PrivateRoute>
            <TipDetails></TipDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;
