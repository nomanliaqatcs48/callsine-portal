import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import("../views/authentication/login")));
const AuthRegister = Loadable(
  lazy(() => import("../views/authentication/signup/Register"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin />,
    },
    // {
    //   path: "/signup",
    //   element: <AuthRegister />,
    // },
  ],
};

export default AuthenticationRoutes;
