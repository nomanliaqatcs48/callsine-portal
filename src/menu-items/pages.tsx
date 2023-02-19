// assets
import { IconKey, IconUsers } from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
  IconUsers,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  // title: "Pages",
  // caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "contacts",
      title: "Contacts",
      type: "item",
      url: "/persons",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
    {
      id: "campaigns",
      title: "Campaigns",
      type: "item",
      url: "/campaigns",
      icon: icons.IconKey,
      breadcrumbs: false,
    },
  ],
};

export default pages;
