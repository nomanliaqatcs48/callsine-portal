import { lazy } from "react";

// project imports
import MinimalLayout from "../layout/MinimalLayout";
import Loadable from "../ui-component/Loadable";

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import("../views/authentication/login")));
const AuthRegister = Loadable(
  lazy(() => import("../views/authentication/signup/index"))
);
const SetPassword = Loadable(
  lazy(() => import("../views/authentication/inviteConfirm/index")) // Update with the correct path to your SetPassword component
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
    {
      path: "/signup",
      element: <AuthRegister />,
    },
    {
      path: "/set-password/:token",
      element: <SetPassword />, // We don't need to pass the token here as it's taken care of by react-router
    },
  ],
};

export default AuthenticationRoutes;
