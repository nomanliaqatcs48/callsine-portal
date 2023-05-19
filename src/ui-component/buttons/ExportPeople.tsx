import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { Button } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

type ExportPeopleTypes = {
  data: any[];
};

const ExportPeople = ({ data }: ExportPeopleTypes) => {
  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
  ];

  return (
    <div>
      <CSVLink data={data} headers={headers} filename={"people.csv"}>
        <Button className="tw-text-[#778da9]">
          <FileDownloadOutlinedIcon
            sx={{ color: "#778da9", fontSize: 15 }}
            className="tw-mr-2"
          />
          Export People
        </Button>
      </CSVLink>
    </div>
  );
};

export default ExportPeople;
