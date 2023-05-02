import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import PublicRoute from "./PublicRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, PublicRoute, AuthenticationRoutes]);
}
