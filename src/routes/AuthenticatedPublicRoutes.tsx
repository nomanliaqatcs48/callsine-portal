import { lazy } from "react";

import Loadable from "../ui-component/Loadable";
import Authenticated from "../ui-component/authentication/Authenticated";
import { Outlet } from "react-router-dom";

const WizardPage = Loadable(lazy(() => import("../views/wizard")));

const AuthenticatedPublicRoutes = {
  path: "/wizard/",
  element: (
    <Authenticated>
      <Outlet />
    </Authenticated>
  ),
  children: [
    {
      path: "campaign",
      element: <WizardPage />,
    },
  ],
};

export default AuthenticatedPublicRoutes;
