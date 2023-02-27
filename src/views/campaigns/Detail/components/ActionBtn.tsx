import React from "react";
import { Button, MenuItem } from "@mui/material";
import StyledMenu from "../../../../ui-component/menu/StyledMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAddPeopleToCampaignModal } from "../hooks/useAddPeopleToCampaignModal";
import { useAddStepModal } from "../hooks/useAddStepModal";

const ActionBtn = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    addPeopleOpen,
    setAddPeopleOpen,
    handleAddPeopleClickOpen,
    handleAddPeopleClose,
    renderAddPeopleModal,
  } = useAddPeopleToCampaignModal();
  const {
    addStepOpen,
    setAddStepOpen,
    handleAddStepClickOpen,
    handleAddStepClose,
    renderAddStepModal,
  } = useAddStepModal();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Actions
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleAddPeopleClickOpen();
          }}
          disableRipple
        >
          Add People to Campaign
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleAddStepClickOpen();
          }}
          disableRipple
        >
          Add Step
        </MenuItem>
      </StyledMenu>

      {addPeopleOpen && renderAddPeopleModal()}
      {addStepOpen && renderAddStepModal()}
    </>
  );
};

export default ActionBtn;
