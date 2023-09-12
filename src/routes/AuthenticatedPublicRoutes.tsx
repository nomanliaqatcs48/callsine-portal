import { lazy } from "react";

import { Outlet } from "react-router-dom";
import Loadable from "../ui-component/Loadable";
import Authenticated from "../ui-component/authentication/Authenticated";

const WizardPage = Loadable(lazy(() => import("../views/wizard")));
const Checkout = Loadable(lazy(() => import("../views/checkout")));

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
    {
      path: "checkout",
      element: <Checkout />,
    },
  ],
};

export default AuthenticatedPublicRoutes;
