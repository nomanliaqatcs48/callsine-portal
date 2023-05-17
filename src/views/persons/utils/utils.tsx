import moment from "moment";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Button } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";

export const _columns: any = () => {
  const theme: any = useTheme();
  return [
    {
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">Name</span>
        );
      },
      accessor: "first_name",
      Cell: (cell: any) => {
        return (
          <a
            className="tw-no-underline"
            href={`/people/${cell?.row?.original?.id}`}
          >
            {cell?.value} {cell?.row?.original?.last_name}
          </a>
        );
      },
    },
    {
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">Title</span>
        );
      },
      accessor: "job_title",
    },
    {
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">
            Company
          </span>
        );
      },
      accessor: "org.name",
    },
    {
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">Phone</span>
        );
      },
      accessor: "phone",
      Cell: (cell: any) => {
        return <span>{cell?.value || "-"}</span>;
      },
    },
    {
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">Email</span>
        );
      },
      accessor: "work_email",
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
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">
            Location
          </span>
        );
      },
      accessor: "city",
      Cell: (cell: any) => {
        return `${cell?.row?.original?.city || ""}${
          cell?.row?.original?.state ? ", " + cell?.row?.original?.state : ""
        }`;
      },
    },
    {
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">
            Industry
          </span>
        );
      },
      accessor: "org.industry",
      Cell: (cell: any) => {
        return cell?.value || "-";
      },
    },
    {
      Header: () => {
        return (
          <span className="tw-font-normal tw-text-xs tw-uppercase">
            Actions
          </span>
        );
      },
      disableSortBy: true,
      accessor: "actions",
      Cell: (cell: any) => {
        return (
          <>
            <Button
              onClick={() => null}
              className="tw-rounded-full tw-p-2 tw-min-w-fit tw-flex tw-flex-row tw-justify-center tw-mx-auto"
            >
              <IconTrash
                style={{ color: theme.palette.primary.main }}
                size="15"
                strokeWidth={3}
                className=""
              />
            </Button>
          </>
        );
      },
    },
    /*{
      Header: "Date Added",
      accessor: "created_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },*/
    /*{
      Header: "Date Modified",
      accessor: "modified_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },*/
  ];
};
