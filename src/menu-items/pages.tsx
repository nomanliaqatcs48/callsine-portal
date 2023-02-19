// assets
import { IconKey } from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
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
      icon: icons.IconKey,
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
