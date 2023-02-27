import React from "react";
import { Box, Button, DialogActions, Modal, Typography } from "@mui/material";
import Select from "react-select";
import { ErrorMessage } from "@hookform/error-message";

type MyModal = {
  open: boolean;
  onClose: any;
  modalTitle: string;
  labelledby: string;
  describedby: string;
  children: React.ReactNode;
};

const MyModal = ({
  open,
  onClose,
  modalTitle,
  labelledby,
  describedby,
  children,
}: MyModal) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={labelledby}
      aria-describedby={describedby}
    >
      <Box sx={style} style={customStyle}>
        <Typography variant="h4">{modalTitle}</Typography>
        <div style={{ height: 15 }} />
        {children}
      </Box>
    </Modal>
  );
};

export default MyModal;

const customStyle = {
  borderRadius: 4,
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  pb: 1,
};
