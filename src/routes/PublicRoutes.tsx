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
const BlogPage = Loadable(lazy(() => import("../views/blog")));
const CallsineVsTheCompetition = Loadable(
  lazy(() => import("../views/blog-posts/callsine-vs-the-competition"))
);
const CallsinesUniquenessInSalesAutomation = Loadable(
  lazy(
    () => import("../views/blog-posts/callsines-uniqueness-in-sales-automation")
  )
);
const UnleashingAiForBusinessDevelopmentRepresentatives = Loadable(
  lazy(
    () =>
      import(
        "../views/blog-posts/unleashing-ai-for-business-development-representatives"
      )
  )
);
const ElevateYourEmailGameWithCallsine = Loadable(
  lazy(
    () => import("../views/blog-posts/elevate-your-email-game-with-callsine")
  )
);
const AiDisruptionInSalesEngagementAndLeadGeneration = Loadable(
  lazy(
    () =>
      import(
        "../views/blog-posts/ai-disruption-in-sales-engagement-and-lead-generation"
      )
  )
);
const AiInLeadGeneration = Loadable(
  lazy(() => import("../views/blog-posts/ai-in-lead-generation"))
);
const CallsinePioneeringTheFutureOfAiDrivenEmailCreation = Loadable(
  lazy(
    () =>
      import(
        "../views/blog-posts/callsine-pioneering-the-future-of-ai-driven-email-creation"
      )
  )
);

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
    {
      path: "/blog",
      element: <BlogPage />,
    },
    {
      path: "/blog/callsine-vs-the-competition",
      element: <CallsineVsTheCompetition />,
    },
    {
      path: "/blog/callsines-uniqueness-in-sales-automation",
      element: <CallsinesUniquenessInSalesAutomation />,
    },
    {
      path: "/blog/unleashing-ai-for-business-development-representatives",
      element: <UnleashingAiForBusinessDevelopmentRepresentatives />,
    },
    {
      path: "/blog/elevate-your-email-game-with-callsine",
      element: <ElevateYourEmailGameWithCallsine />,
    },
    {
      path: "/blog/ai-disruption-in-sales-engagement-and-lead-generation",
      element: <AiDisruptionInSalesEngagementAndLeadGeneration />,
    },
    {
      path: "/blog/ai-in-lead-generation",
      element: <AiInLeadGeneration />,
    },
    {
      path: "/blog/callsine-pioneering-the-future-of-ai-driven-email-creation",
      element: <CallsinePioneeringTheFutureOfAiDrivenEmailCreation />,
    },
  ],
};

export default AuthenticationRoutes;
