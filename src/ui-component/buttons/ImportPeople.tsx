import React, { useState } from "react";
import {
  Button,
  DialogActions,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MyModal from "../modal/MyModal";
import PeopleFileUpload from "../uploads/PeopleFileUpload";
import { devLog } from "../../helpers/logs";

type ImportPeopleProps = {
  onLoadApi: any;
};

const ImportPeople = ({ onLoadApi }: ImportPeopleProps) => {
  const [importData, setImportData] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });

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
          className="tw-text-[#778da9]"
        >
          <FileUploadOutlinedIcon
            sx={{ color: "#778da9", fontSize: 15 }}
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
          </Grid>
        </MyModal>
      )}
    </>
  );
};

export default ImportPeople;
