import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button, Grid, Tooltip } from "@mui/material";
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
    "First Name,Last Name,Job Title, Email Address, LinkedIn Contact Profile URL, Company Name, Website\n"; // Customize this line to match the template

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
          className="tw-text-[16px] tw-tracking-[0.32px]"
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
          modalSxStyle={{ width: { xs: 400 } }}
        >
          <Grid container spacing={2} className="tw-p-3">
            <Grid item xs={12}>
              <PeopleFileUpload instance={importData} refresh={refresh} />
            </Grid>
            <Grid item xs={12} className="tw-flex tw-justify-center">
              <Button onClick={downloadTemplate} variant="text">
                Download template
              </Button>
            </Grid>
          </Grid>
        </MyModal>
      )}
    </>
  );
};

export default ImportPeople;
