import { useRoutes } from "react-router-dom";
import { lazy } from "react";

import Loadable from "../ui-component/Loadable";
// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import PublicRoute from "./PublicRoutes";
import AuthenticatedPublicRoutes from "./AuthenticatedPublicRoutes";

const HomePage = Loadable(lazy(() => import("../views/home")));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    MainRoutes,
    PublicRoute,
    AuthenticationRoutes,
    AuthenticatedPublicRoutes,
  ]);
}
