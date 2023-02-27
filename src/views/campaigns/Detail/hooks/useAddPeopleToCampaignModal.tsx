import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import MyModal from "../../../../ui-component/modal/MyModal";

export const useAddPeopleToCampaignModal = () => {
  const [addPeopleOpen, setAddPeopleOpen] = React.useState<boolean>(false);

  const {
    formState: { errors },
  } = useForm();

  const handleAddPeopleClickOpen = () => {
    setAddPeopleOpen(true);
  };

  const handleAddPeopleClose = () => {
    setAddPeopleOpen(false);
  };

  const renderAddPeopleModal = () => {
    return (
      <MyModal
        open={addPeopleOpen}
        onClose={handleAddPeopleClose}
        modalTitle="Add People to Campaign"
        labelledby="Add People to Campaign"
        describedby="add people to campaign modal"
      >
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={null}
          isClearable={true}
          isSearchable={true}
          name="client"
          options={[
            {
              value: 1,
              label: "1",
            },
            {
              value: 2,
              label: "2",
            },
            {
              value: 3,
              label: "3",
            },
            {
              value: 4,
              label: "4",
            },
            {
              value: 5,
              label: "5",
            },
            {
              value: 6,
              label: "6",
            },
          ]}
          // onInputChange={(value: any) => {
          //   setPersonLoading(true);
          //   setPersons([]);
          //   void handleSearchPerson(value);
          // }}
          // onChange={(value: any) => handleSelectPerson(value)}
          // isLoading={personLoading}
          // isDisabled={isLoading}
        />
        <ErrorMessage
          errors={errors}
          name="person"
          render={({ message }) => (
            <div className="union-error-message invalid-feedback">
              {message}
            </div>
          )}
        />

        <DialogActions>
          <Button onClick={() => null}>Cancel</Button>
          <Button onClick={() => null}>Subscribe</Button>
        </DialogActions>
      </MyModal>
    );
  };

  return {
    addPeopleOpen,
    setAddPeopleOpen,
    handleAddPeopleClickOpen,
    handleAddPeopleClose,
    renderAddPeopleModal,
  };
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
  pb: 0,
};
