import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import PublicRoute from "./PublicRoutes";
import AuthenticatedPublicRoutes from "./AuthenticatedPublicRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    MainRoutes,
    PublicRoute,
    AuthenticationRoutes,
    AuthenticatedPublicRoutes,
  ]);
}
