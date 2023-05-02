import { lazy } from "react";

import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

const Home = Loadable(lazy(() => import("../views/home/index")));

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
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
