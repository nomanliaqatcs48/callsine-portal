import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// login option 3 routing
const Home = Loadable(lazy(() => import("../views/home/index")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const PublicRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ],
};

export default PublicRoutes;
