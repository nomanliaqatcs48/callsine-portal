import React from "react";
import moment from "moment";

export const usePeopleTab = () => {
  const _columns: any = [
    {
      Header: "First",
      accessor: "first_name",
      Cell: (cell: any) => {
        return (
          <a className="" href={`/persons/${cell?.row?.original?.id}`}>
            {cell?.value}
          </a>
        );
      },
    },
    {
      Header: "Last",
      accessor: "last_name",
    },
    {
      Header: "Email",
      accessor: "email",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        return (
          <a
            href={`mailto:${cell?.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cell?.value}
          </a>
        );
      },
    },
    {
      Header: "Date Added",
      accessor: "created_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },
    {
      Header: "Date Modified",
      accessor: "modified_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },
  ];

  return { _columns };
};
