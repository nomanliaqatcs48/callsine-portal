import { lazy } from "react";

// project imports
import SettingsPage from "src/views/settings";
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import Authenticated from "../ui-component/authentication/Authenticated";

// utilities routing
const DashboardDefault = Loadable(lazy(() => import("../views/dashboard")));
const PersonsPage = Loadable(lazy(() => import("../views/persons")));
const PersonDetailPage = Loadable(
  lazy(() => import("../views/persons/Detail/index"))
);
const PersonDetailPageTest = Loadable(
  lazy(() => import("../views/persons/Detail/index-test"))
);
const CampaignsPage = Loadable(lazy(() => import("../views/campaigns")));
const CampaignDetailPage = Loadable(
  lazy(() => import("../views/campaigns/Detail/index"))
);
const MailAccountsPage = Loadable(lazy(() => import("../views/mail-accounts")));
const ProfilePage = Loadable(lazy(() => import("../views/profile")));
const DataPage = Loadable(lazy(() => import("../views/data")));
const PlaybooksPage = Loadable(lazy(() => import("../views/playbooks")));
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));
const TeamPage = Loadable(lazy(() => import("../views/team")));

const WizardPage = Loadable(lazy(() => import("../views/wizard")));

const WizardPageOld = Loadable(lazy(() => import("../views/wizard/old")));

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
      path: "team",
      element: <TeamPage />,
    },
    {
      path: "settings",
      element: <SettingsPage />,
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
      path: "people-test/:id",
      element: <PersonDetailPageTest />,
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
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "data",
      element: <DataPage />,
    },
    {
      path: "playbooks",
      element: <PlaybooksPage />,
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    {
      path: "wizard",
      element: <WizardPage />,
    },
    {
      path: "wizard/old",
      element: <WizardPageOld />,
    },
  ],
};

export default MainRoutes;
