import { lazy } from "react";

import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import PublicLayout from "../layout/PublicLayout";
import { Outlet } from "react-router-dom";
import Unauthenticated from "../ui-component/authentication/Unauthenticated";

const Home = Loadable(lazy(() => import("../views/home/index")));

const AuthenticationRoutes = {
  path: "/",
  element: (
    <Unauthenticated>
      <PublicLayout />
    </Unauthenticated>
  ),
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ],
};

export default AuthenticationRoutes;
