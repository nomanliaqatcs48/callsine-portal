// assets
import { IconKey, IconUsers, IconMail } from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
  IconUsers,
  IconMail,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  // title: "Pages",
  // caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "persons",
      title: "People",
      type: "item",
      url: "/persons",
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
