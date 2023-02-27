import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

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
      <Dialog
        open={addPeopleOpen}
        fullWidth={true}
        maxWidth="xs"
        onClose={handleAddPeopleClose}
      >
        <DialogTitle>
          <Typography variant="h4">Add Person to Campaign</Typography>
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPeopleClose}>Cancel</Button>
          <Button onClick={handleAddPeopleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
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
