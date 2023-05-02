import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// login option 3 routing
const Home = Loadable(lazy(() => import("../views/home/index")));
const AuthLogin = Loadable(
  lazy(() => import("../views/authentication/login/Login"))
);
const AuthRegister = Loadable(
  lazy(() => import("../views/authentication/signup/Register"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <AuthLogin />,
    },
    {
      path: "/signup",
      element: <AuthRegister />,
    },
  ],
};

export default AuthenticationRoutes;
