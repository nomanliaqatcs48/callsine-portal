import React from "react";
import { CSVLink } from "react-csv";
import { Button, Tooltip } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useMailAccounts } from "../../hooks/mail-accounts/useMailAccounts";

const ExportMailAccounts = () => {
  const { mailAccountsData } = useMailAccounts(true, {
    limit: 99999,
    offset: 0,
  });

  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Provider", key: "provider" },
    { label: "Signature", key: "signature" },
    { label: "Is Connected?", key: "connected" },
  ];

  return (
    <>
      <CSVLink
        data={mailAccountsData}
        headers={headers}
        filename={"mail_accounts.csv"}
        onClick={() => {
          if (!mailAccountsData?.length) {
            return false;
          }
        }}
      >
        <Tooltip
          title={mailAccountsData?.length > 0 ? "Export CSV" : "No data"}
        >
          <Button
            className={`${
              mailAccountsData?.length > 0 ? "" : "tw-cursor-not-allowed"
            }`}
          >
            <FileDownloadOutlinedIcon
              sx={{ color: "#1a76d2", fontSize: 15 }}
              className="tw-mr-2"
            />
            Export Mail Accounts
          </Button>
        </Tooltip>
      </CSVLink>
    </>
  );
};

export default ExportMailAccounts;
