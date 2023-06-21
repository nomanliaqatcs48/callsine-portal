import React, { useMemo } from "react";
// import NewGmailAccount from "../../ui-component/buttons/NewGmailAccount";
// import NewOutlookAccount from "../../ui-component/buttons/NewOutlookAccount";
import DeleteMailAccount from "../../ui-component/buttons/DeleteMailAccount";
import CreateOrEditMailAccount from "../../ui-component/buttons/CreateOrEditMailAccount";
import EditIcon from "@mui/icons-material/Edit";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";
import { Button, Divider, List, Tooltip } from "@mui/material";
import { ReactComponent as UserIcon } from "../../assets/images/svg/user.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/images/svg/linkedin.svg";
import { ReactComponent as FacebookIcon } from "../../assets/images/svg/facebook.svg";

export const _columns = (getMailAccounts: any) => {
  const theme: any = useTheme();

  return useMemo(
    () => [
      {
        Header: "Name",
        accessor: "first_name",
        Cell: (cell: any) => {
          return (
            <span className="">
              {cell?.value && (
                <Button
                  variant="text"
                  className="tw-flex tw-items-center tw-justify-start tw-gap-2 tw-text-inherit tw-text-[0.75rem] tw-leading-4 tw-no-underline hover:tw-bg-transparent text tw-cursor-auto"
                >
                  <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                    <UserIcon className="tw-absolute tw-w-7 tw-h-7 tw-text-gray-400" />
                  </div>
                  <span>
                    {cell?.value || ""} {cell?.row?.original?.last_name || ""}
                  </span>
                </Button>
              )}
            </span>
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
        Cell: (cell: any) => {
          return (
            <>
              {/*<a
              href={`mailto:${cell?.value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cell?.value}
            </a>*/}
              <a
                href={`mailto:${cell?.value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
              >
                {cell?.value}
              </a>
            </>
          );
        },
      },
      {
        Header: "Provider",
        accessor: "provider",
        Cell: (cell: any) => {
          return (
            <div style={{ textTransform: "capitalize" }}>{cell?.value}</div>
          );
        },
      },
      /*{
      Header: "Status",
      accessor: "connected",
      Cell: (cell: any) => {
        let showBtn = () => {
          return (
            <NewGmailAccount
              buttonText="Connect"
              email={cell?.row?.original?.email}
            />
          );
        };

        if (cell?.row?.original?.provider === "outlook") {
          showBtn = () => {
            return (
              <NewOutlookAccount
                buttonText="Connect"
                email={cell?.row?.original?.email}
              />
            );
          };
        }

        return cell?.value ? "Connected" : showBtn();
      },
    },*/
      {
        Header: "Actions",
        accessor: "action",
        disableSortBy: true,
        Cell: (cell: any) => {
          return (
            <div className="tw-flex tw-justify-start tw-w-9">
              {/*<CreateOrEditMailAccount
                id={cell?.row?.original?.id}
                defaultValue={cell?.row?.original}
                btnText={
                  <>
                    <EditIcon />
                  </>
                }
                onSubmit={getMailAccounts}
                onClick={() => null}
                btnVariant="outlined"
                className="tw-border-transparent tw-rounded-full tw-h-8"
                sx={{ p: 2, m: 0, width: 0, minWidth: 35 }}
              />*/}
              <CreateOrEditMailAccount
                id={cell?.row?.original?.id}
                defaultValue={cell?.row?.original}
                onLoadApi={getMailAccounts}
                className="tw-rounded-full tw-p-2 tw-min-w-fit tw-flex tw-flex-row tw-justify-center tw-mx-auto"
                onClick={() => null}
              >
                <Tooltip title="Edit">
                  <EditIcon
                    style={{ color: theme.palette.primary.main, fontSize: 19 }}
                    fontSize="small"
                    strokeWidth={3}
                    className=""
                  />
                </Tooltip>
              </CreateOrEditMailAccount>
              <DeleteMailAccount
                id={cell?.row?.original?.id}
                onLoadApi={getMailAccounts}
              >
                <IconTrash
                  style={{ color: theme.palette.primary.main }}
                  size="18"
                  strokeWidth={3}
                  className=""
                />
              </DeleteMailAccount>
            </div>
          );
        },
      },
    ],
    []
  );
};
