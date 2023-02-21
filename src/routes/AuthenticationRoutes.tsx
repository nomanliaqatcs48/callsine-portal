import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("../views/authentication/login/Login"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("../views/authentication/signup/Register"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin3 />,
    },
    {
      path: "/signup",
      element: <AuthRegister3 />,
    },
  ],
};

export default AuthenticationRoutes;
