import React from "react";
import { Box, Modal, Typography } from "@mui/material";

type MyModal = {
  open: boolean;
  onClose: any;
  modalTitle: string;
  modalSxStyle?: any;
  modalCustomStyle?: any;
  labelledby: string;
  describedby: string;
  children: React.ReactNode;
};

const MyModal = ({
  open,
  onClose,
  modalTitle,
  modalSxStyle,
  modalCustomStyle = {},
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
      <Box
        sx={{ ...style, ...modalSxStyle }}
        style={{ ...customStyle, ...modalCustomStyle }}
      >
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
  bgcolor: "background.paper",
  width: 400,
  boxShadow: 24,
  p: 3,
  pb: 1,
};
