import React from "react";
import { Button, Tooltip } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const ImportPeople = () => {
  return (
    <>
      <Tooltip title="Coming Soon">
        <Button
          onClick={() => null}
          disabled={false}
          className="tw-text-[#778da9]"
        >
          <FileUploadOutlinedIcon
            sx={{ color: "#778da9", fontSize: 15 }}
            className="tw-mr-2"
          />
          Import People
        </Button>
      </Tooltip>
    </>
  );
};

export default ImportPeople;
