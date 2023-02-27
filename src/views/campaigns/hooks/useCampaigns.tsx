import React from "react";

export const useCampaigns = () => {
  const [campaignsData, setCampaignsData] = React.useState<any[]>([
    {
      id: 1,
      first_name: "Ken",
      last_name: "Vilar",
      email: "kvilar@unionresolute.com",
      created_date: "2023-01-01T17:06:11.224927Z",
      modified_date: "2023-02-15T17:06:11.224927Z",
    },
    {
      id: 2,
      first_name: "Roselle",
      last_name: "Ebarle",
      email: "rebarle@unionresolute.com",
      created_date: "2023-01-02T17:06:11.224927Z",
      modified_date: "2023-02-16T17:06:11.224927Z",
    },
    {
      id: 3,
      first_name: "John",
      last_name: "Doe",
      email: "jdoe@unionresolute.com",
      created_date: "2023-01-03T17:06:11.224927Z",
      modified_date: "2023-02-17T17:06:11.224927Z",
    },
  ]);
  const [total, setTotal] = React.useState<number>(0);
  const [filters, setFilters] = React.useState<any>({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = React.useState({
    onPage: true,
    table: false,
  });

  return {
    campaignsData,
    setCampaignsData,
    total,
    setTotal,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
  };
};
