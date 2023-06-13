import React, { useState } from "react";
import { Button, Grid, Tooltip } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MyModal from "../modal/MyModal";
import PeopleFileUpload from "../uploads/PeopleFileUpload";
import AddUserDataUpload from "../uploads/AddUserDataUpload";

type AddUserDataTypes = {
  onLoadApi: any;
};

const AddUserData = ({ onLoadApi }: AddUserDataTypes) => {
  const [userData, setUserData] = useState<any>(null);
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
      <Tooltip title="Add Data">
        <Button
          onClick={handleOpen}
          disabled={false}
          // className="tw-text-[#778da9]"
        >
          <FileUploadOutlinedIcon
            sx={{ color: "#1a76d2", fontSize: 15 }}
            className="tw-mr-2"
          />
          Add Data
        </Button>
      </Tooltip>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle="Add Data"
          labelledby="Add Data"
          describedby="add user data modal"
          modalSxStyle={{ width: { xs: 400 } }}
        >
          <Grid container spacing={2} className="tw-p-3">
            <Grid item xs={12}>
              <AddUserDataUpload instance={userData} refresh={refresh} />
            </Grid>
          </Grid>
        </MyModal>
      )}
    </>
  );
};

export default AddUserData;
