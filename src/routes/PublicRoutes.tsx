import { lazy } from "react";

import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import PublicLayout from "../layout/PublicLayout";
import { Outlet } from "react-router-dom";
import Unauthenticated from "../ui-component/authentication/Unauthenticated";

const Home = Loadable(lazy(() => import("../views/home/index")));
const HomePage = Loadable(lazy(() => import("../views/home")));
const PricingPage = Loadable(lazy(() => import("../views/pricing")));
const PrivacyPage = Loadable(lazy(() => import("../views/privacy")));

const AuthenticationRoutes = {
  path: "/",
  element: <PublicLayout />,
  children: [
    /*{
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },*/
    {
      path: "/asdasdleadresolution07202023!$",
      element: <HomePage />,
    },
    {
      path: "/pricing",
      element: <PricingPage />,
    },
    {
      path: "/privacy",
      element: <PrivacyPage />,
    },
  ],
};

export default AuthenticationRoutes;
