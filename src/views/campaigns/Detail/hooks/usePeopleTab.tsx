import React from "react";
import moment from "moment";

export const usePeopleTab = () => {
  const _columns: any = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Step",
      accessor: "step",
    },
    {
      Header: "Stage",
      accessor: "stage",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Stats",
      accessor: "stats",
    },
    {
      Header: "Assignee",
      accessor: "assignee",
    },
    {
      Header: "Owner",
      accessor: "owner",
    },
    {
      Header: "Last Contacted",
      accessor: "last_contacted",
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },
  ];

  return { _columns };
};
