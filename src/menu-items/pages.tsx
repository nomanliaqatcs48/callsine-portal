// assets
import {
  IconBook2,
  IconDashboard,
  IconFileDatabase,
  IconInbox,
  IconKey,
  IconMail,
  IconPlugConnected,
  IconUsers,
} from "@tabler/icons-react";

// constant
const icons = {
  IconDashboard,
  IconKey,
  IconUsers,
  IconMail,
  IconFileDatabase,
  IconBook2,
  IconInbox,
  IconPlugConnected,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  // title: "Pages",
  // caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "people",
      title: "People",
      type: "item",
      url: "/people",
      icon: icons.IconUsers,
      breadcrumbs: false,
      isPremium: false,
    },
    // {
    //   id: "default",
    //   title: "Dashboard",
    //   type: "item",
    //   url: "/dashboard",
    //   icon: icons.IconDashboard,
    //   breadcrumbs: false,
    //   isPremium: false,
    // },
    {
      id: "inbox",
      title: "Inbox",
      type: "item",
      url: "/inbox",
      icon: icons.IconInbox,
      breadcrumbs: false,
      isPremium: true,
    },
    // {
    //   id: "mail-accounts",
    //   title: "Mail Accounts",
    //   type: "item",
    //   url: "/mail-accounts",
    //   icon: icons.IconMail,
    //   breadcrumbs: false,
    //   isPremium: true,
    // },
    {
      id: "playbooks",
      title: "Playbooks",
      type: "item",
      url: "/playbooks",
      icon: icons.IconBook2,
      breadcrumbs: false,
      isPremium: false,
    },
    {
      id: "data",
      title: "Materials",
      type: "item",
      url: "/data",
      icon: icons.IconFileDatabase,
      breadcrumbs: false,
      isPremium: false,
    },
    {
      id: "integrations",
      title: "Integrations",
      type: "item",
      url: "",
      icon: icons.IconPlugConnected,
      breadcrumbs: false,
      isPremium: false,
      isDisabled: true,
    },
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
