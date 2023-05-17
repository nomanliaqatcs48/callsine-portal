import moment from "moment";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Button } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import { Image } from "mui-image";
import { ReactComponent as UserIcon } from "../../../assets/images/svg/user.svg";

export const _columns: any = () => {
  const theme: any = useTheme();
  return [
    {
      Header: "Name",
      accessor: "first_name",
      Cell: (cell: any) => {
        return (
          <div className="tw-flex tw-gap-2">
            {cell?.value && (
              <>
                <div className="tw-relative tw-w-7 tw-h-7 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                  <UserIcon className="tw-absolute tw-w-7 tw-h-7 tw-text-gray-400" />
                </div>

                <a
                  className="tw-no-underline tw-flex tw-items-center"
                  href={`/people/${cell?.row?.original?.id}`}
                >
                  {cell?.value || ""} {cell?.row?.original?.last_name || ""}
                </a>
              </>
            )}
          </div>
        );
      },
    },
    {
      Header: "Title",
      accessor: "job_title",
    },
    {
      Header: "Company",
      accessor: "org.name",
    },
    {
      Header: "Phone",
      accessor: "phone",
      Cell: (cell: any) => {
        return <span>{cell?.value || "-"}</span>;
      },
    },
    {
      Header: "Email",
      accessor: "work_email",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        return (
          <a
            href={`mailto:${cell?.value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
          >
            {cell?.value}
          </a>
        );
      },
    },
    {
      Header: "Location",
      accessor: "city",
      Cell: (cell: any) => {
        return `${cell?.row?.original?.city || ""}${
          cell?.row?.original?.state ? ", " + cell?.row?.original?.state : ""
        }`;
      },
    },
    {
      Header: "Industry",
      accessor: "org.industry",
      Cell: (cell: any) => {
        return cell?.value || "-";
      },
    },
    {
      Header: "Actions",
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
