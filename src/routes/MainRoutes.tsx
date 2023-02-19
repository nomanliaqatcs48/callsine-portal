import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

// utilities routing
const DashboardDefault = Loadable(lazy(() => import("../views/dashboard")));
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
