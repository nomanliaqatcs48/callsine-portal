import React from "react";
import moment from "moment";

export const useEmailsTab = () => {
  const _columns: any = [
    {
      Header: "To",
      accessor: "to",
    },
    {
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Sent At",
      accessor: "sent_at",
    },
    {
      Header: "Opens",
      accessor: "opens",
    },
    {
      Header: "Clicks",
      accessor: "clicks",
    },
    {
      Header: "Replies",
      accessor: "replies",
    },
  ];

  return { _columns };
};
