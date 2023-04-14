import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import Authenticated from "../ui-component/authentication/Authenticated";

// utilities routing
const DashboardDefault = Loadable(lazy(() => import("../views/dashboard")));
const PersonsPage = Loadable(lazy(() => import("../views/persons")));
const PersonDetailPage = Loadable(
  lazy(() => import("../views/persons/Detail/index"))
);
const CampaignsPage = Loadable(lazy(() => import("../views/campaigns")));
const CampaignDetailPage = Loadable(
  lazy(() => import("../views/campaigns/Detail/index"))
);
const MailAccountsPage = Loadable(lazy(() => import("../views/mail-accounts")));
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
      path: "people",
      element: <PersonsPage />,
    },
    {
      path: "people/:id",
      element: <PersonDetailPage />,
    },
    {
      path: "campaigns",
      element: <CampaignsPage />,
    },
    {
      path: "campaigns/:id",
      element: <CampaignDetailPage />,
    },
    {
      path: "mail-accounts",
      element: <MailAccountsPage />,
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
