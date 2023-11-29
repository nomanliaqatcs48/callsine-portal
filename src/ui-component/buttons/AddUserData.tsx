import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button, Grid, Tooltip } from "@mui/material";
import React, { useState } from "react";
import MyModal from "../modal/MyModal";
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
      <Tooltip title="Add Materials" PopperProps={{style:{zIndex:999}}}>
        <Button
          onClick={handleOpen}
          disabled={false}
          className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-primary"
        >
          <FileUploadOutlinedIcon
            sx={{ color: "#1a76d2", fontSize: 15 }}
            className="tw-mr-2"
          />
          Add Materials
        </Button>
      </Tooltip>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle="Add Data"
          labelledby="Add Data"
          describedby="add user data modal"
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
              <AddUserDataUpload instance={userData} refresh={refresh} />
            </Grid>
          </Grid>
        </MyModal>
      )}
    </>
  );
};

export default AddUserData;
