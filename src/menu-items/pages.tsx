// assets
import {
  IconDashboard,
  IconKey,
  IconUsers,
  IconMail,
  IconFileDatabase,
} from "@tabler/icons-react";

// constant
const icons = {
  IconDashboard,
  IconKey,
  IconUsers,
  IconMail,
  IconFileDatabase,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  // title: "Pages",
  // caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "people",
      title: "People",
      type: "item",
      url: "/people",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
    {
      id: "mail-accounts",
      title: "Mail Accounts",
      type: "item",
      url: "/mail-accounts",
      icon: icons.IconMail,
      breadcrumbs: false,
    },
    /*{
      id: "data",
      title: "Data",
      type: "item",
      url: "/data",
      icon: icons.IconFileDatabase,
      breadcrumbs: false,
    },*/
    /*{
      id: "profile",
      title: "Profile",
      type: "item",
      url: "/profile",
      icon: icons.IconMail,
      breadcrumbs: false,
    },*/
    // {
    //   id: "campaigns",
    //   title: "Campaigns",
    //   type: "item",
    //   url: "/campaigns",
    //   icon: icons.IconKey,
    //   breadcrumbs: false,
    // },
  ],
};

export default pages;
