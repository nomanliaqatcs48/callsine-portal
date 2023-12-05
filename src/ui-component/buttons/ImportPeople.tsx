import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import MyModal from "../modal/MyModal";
import PeopleFileUpload from "../uploads/PeopleFileUpload";

type ImportPeopleProps = {
  onLoadApi: any;
};

const ImportPeople = ({ onLoadApi }: ImportPeopleProps) => {
  const [importData, setImportData] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

  // Define the CSV template
  const csvData =
    "First Name,Last Name,Phone Number,Job Title,Company Name,Email Address,Website,LinkedIn Contact Profile URL,Industry,City,State\n"; // Customize this line to match the template

  // Function to handle the download
  const downloadTemplate = () => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "template.csv");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const refresh = async () => {
    setOpen(false);
    onLoadApi();
  };

  return (
    <>
      <Tooltip title="Bulk Import">
        <Button
          onClick={handleOpen}
          disabled={false}
          className="tw-text-[16px] tw-tracking-[0.32px] tw-font-normal"
        >
          <FileUploadOutlinedIcon
            sx={{ color: "#1a76d2", fontSize: 15 }}
            className="tw-mr-2"
          />
          Import People
        </Button>
      </Tooltip>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle="Bulk Import"
          labelledby="Bulk Import"
          describedby="bulk import modal"
          modalSxStyle={{
            width: { xs: 400 },
            padding: 0,
            "& h4": {
              backgroundColor: "#EAEAEA",
              padding: "20px 30px",
              fontSize: { xs: 14, lg: 16 },
            },
          }}
        >
          <Grid container spacing={2} className="tw-p-3 tw-px-[30px]">
            <Grid item xs={12}>
              <PeopleFileUpload instance={importData} refresh={refresh} />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ flexDirection: "column" }}
              className=" tw-flex tw-justify-center lg:tw-mb-[20px]"
            >
              <Button
                onClick={downloadTemplate}
                variant="outlined"
                className="tw-text-[14px] lg:tw-text-[16px] tw-font-medium tw-py-[13px] tw-px-[25px]"
              >
                Download Import template
              </Button>
              <Typography mt={1} variant="caption">
                Download this template to ensure your people import is formatted
                properly.{" "}
              </Typography>
            </Grid>
          </Grid>
        </MyModal>
      )}
    </>
  );
};

export default ImportPeople;
