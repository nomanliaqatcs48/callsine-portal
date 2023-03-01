import React from "react";
import { Button, DialogActions } from "@mui/material";
import MyModal from "../../../../ui-component/modal/MyModal";

export const usePlaybook = () => {
  const [playbookOpen, setPlaybookOpen] = React.useState<boolean>(false);

  const handlePlaybookOpen = () => {
    setPlaybookOpen(true);
  };

  const handlePlaybookClose = () => {
    setPlaybookOpen(false);
  };

  const renderPlaybookModal = () => {
    return (
      <MyModal
        open={playbookOpen}
        onClose={handlePlaybookClose}
        modalTitle="Edit Email"
        labelledby="Edit Email Modal"
        describedby="edit email modal"
      >
        <div>ok</div>

        <DialogActions>
          <Button onClick={handlePlaybookClose}>Cancel</Button>
          <Button onClick={handlePlaybookClose}>Add</Button>
        </DialogActions>
      </MyModal>
    );
  };

  return {
    playbookOpen,
    setPlaybookOpen,
    handlePlaybookOpen,
    handlePlaybookClose,
    renderPlaybookModal,
  };
};
