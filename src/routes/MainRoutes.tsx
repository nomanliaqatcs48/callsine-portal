import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import Authenticated from "../ui-component/authentication/Authenticated";

// utilities routing
const DashboardDefault = Loadable(lazy(() => import("../views/dashboard")));
const PersonsPage = Loadable(lazy(() => import("../views/persons")));
const PersonDetailPage = Loadable(
  lazy(() => import("../views/persons/detail/index"))
);
const CampaignsPage = Loadable(lazy(() => import("../views/campaigns")));
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <Authenticated>
      <MainLayout />
    </Authenticated>
  ),
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
      path: "persons",
      element: <PersonsPage />,
    },
    {
      path: "persons/:id",
      element: <PersonDetailPage />,
    },
    {
      path: "campaigns",
      element: <CampaignsPage />,
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
