import React from "react";
import NewGmailAccount from "../../ui-component/buttons/NewGmailAccount";
import NewOutlookAccount from "../../ui-component/buttons/NewOutlookAccount";
import DeleteMailAccount from "../../ui-component/buttons/DeleteMailAccount";
import CreateOrEditMailAccount from "../../ui-component/buttons/CreateOrEditMailAccount";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const _columns = (getMailAccounts: any) => {
  return [
    {
      Header: "First",
      accessor: "first_name",
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
      Header: "Provider",
      accessor: "provider",
      Cell: (cell: any) => {
        return <div style={{ textTransform: "capitalize" }}>{cell?.value}</div>;
      },
    },
    {
      Header: "Connected",
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
    },
    {
      Header: "",
      accessor: "action",
      disableSortBy: true,
      Cell: (cell: any) => {
        return (
          <div className="tw-flex">
            <CreateOrEditMailAccount
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
            />
            <span className="" />
            <DeleteMailAccount
              id={cell?.row?.original?.id}
              variant="outlined"
              buttonText={
                <>
                  <DeleteIcon />
                </>
              }
              onLoadApi={getMailAccounts}
              className="tw-border-transparent tw-rounded-full tw-h-8"
              sx={{ p: 2, m: 0, width: 0, minWidth: 35 }}
            />
          </div>
        );
      },
    },
  ];
};
