import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { Button, Tooltip } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

type ExportPeopleTypes = {
  data: any[];
};

const ExportPeople = ({ data }: ExportPeopleTypes) => {
  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Title", key: "job_title" },
    { label: "Company", key: "org.name" },
    { label: "Work Email", key: "work_email" },
    { label: "Linkedin", key: "linkedin" },
    { label: "Industry", key: "org.industry" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Email Domain", key: "email_domain" },
    { label: "Employee Count", key: "org.employee_count" },
    { label: "Revenue Range", key: "org.revenue_range" },
    { label: "NAICS", key: "org.naics" },
    { label: "NAICS Description", key: "org.naics_description" },
    { label: "SIC", key: "org.sic" },
    { label: "SIC Description", key: "org.sic_description" },
  ];

  return (
    <>
      <CSVLink
        data={data}
        headers={headers}
        filename={"people.csv"}
        onClick={() => {
          if (!data?.length) {
            return false;
          }
        }}
      >
        <Tooltip title={data?.length > 0 ? "Export CSV" : "No data"}>
          <Button
            className={`${data?.length > 0 ? "" : "tw-cursor-not-allowed"}`}
          >
            <FileDownloadOutlinedIcon
              sx={{ color: "#1a76d2", fontSize: 15 }}
              className="tw-mr-2"
            />
            Export People
          </Button>
        </Tooltip>
      </CSVLink>
    </>
  );
};

export default ExportPeople;
