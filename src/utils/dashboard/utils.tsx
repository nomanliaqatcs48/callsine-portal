import React from "react";
import _ from "lodash";
import { IconTrash } from "@tabler/icons-react";
import DeleteScheduledEmail from "../../ui-component/buttons/DeleteScheduledEmail";
import { useTheme } from "@mui/material/styles";
import { Box, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateOrEditMailAccount from "../../ui-component/buttons/CreateOrEditMailAccount";
import CreateOrEditScheduledEmail from "../../ui-component/buttons/CreateOrEditScheduledEmail";
import moment from "moment/moment";

export const _columns = (
  getScheduledEmails: any,
  personsData: any,
  mailAccountsData: any
): any[] => {
  const theme: any = useTheme();

  return [
    {
      Header: "ID",
      accessor: "id",
      disableSortBy: true,
      Cell: (cell: any) => {
        return (
          <>
            <CreateOrEditScheduledEmail
              id={cell?.row?.original?.id}
              defaultValue={cell?.row?.original}
              personId={cell?.row?.original?.person}
              onLoadApi={getScheduledEmails}
              className="tw-p-0 tw-min-w-fit"
              onClick={() => null}
              variant="text"
            >
              {cell?.value}
            </CreateOrEditScheduledEmail>
          </>
        );
      },
    },
    {
      Header: "Person",
      accessor: "person",
      disableSortBy: true,
      Cell: (cell: any) => {
        let _person = _.filter(personsData, (o: any) => cell?.value === o?.id);
        return (
          <>
            {_person?.[0] ? (
              <>
                <a
                  href={`/people/${_person[0]?.id}`}
                  className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
                >
                  {_person[0]?.first_name} {_person[0]?.last_name}
                </a>
              </>
            ) : (
              <hr className="tw-w-3 tw-border-black" />
            )}
          </>
        );
      },
    },
    {
      Header: "Scheduled Time",
      accessor: "scheduledEmail.scheduled_time",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value ? (
          <>
            <Tooltip title={cell?.value}>
              <Box>{moment.utc(cell?.value).format("lll")}</Box>
            </Tooltip>
          </>
        ) : (
          <hr className="tw-w-3 tw-border-black" />
        );
      },
    },
    {
      Header: "From",
      accessor: "scheduledEmail.from_email",
      disableSortBy: true,
      Cell: (cell: any) => {
        let _from = _.filter(
          mailAccountsData,
          (o: any) => cell?.value === o?.id
        );
        return (
          <>
            {_from?.[0] ? (
              <>
                <a
                  href={`mailto:${_from[0]?.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
                >
                  {_from[0]?.email}
                </a>
              </>
            ) : (
              <hr className="tw-w-3 tw-border-black" />
            )}
          </>
        );
      },
    },
    {
      Header: "To",
      accessor: "scheduledEmail.to",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value ? (
          <>
            <a
              href={`mailto:${cell?.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
            >
              {cell?.value}
            </a>
          </>
        ) : (
          <hr className="tw-w-3 tw-border-black" />
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
      Cell: (cell: any) => {
        return cell?.value.toLowerCase()?.includes("scheduled") ? (
          "Scheduled Email"
        ) : cell?.value.toLowerCase()?.includes("generated") ? (
          "Generated Email"
        ) : (
          <hr className="tw-w-3 tw-border-black" />
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      width: 50,
      minWidth: 50,
      Cell: (cell: any) => {
        return (
          <>
            <DeleteScheduledEmail
              id={cell?.row?.original?.id}
              onLoadApi={getScheduledEmails}
            >
              <IconTrash
                style={{ color: theme.palette.primary.main }}
                size="15"
                strokeWidth={3}
                className=""
              />
            </DeleteScheduledEmail>
          </>
        );
      },
    },
  ];
};
