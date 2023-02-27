import React from "react";
import { Button, DialogActions, DialogContentText } from "@mui/material";
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
        modalTitle="Add Person to Campaign"
        labelledby="Add Person to Campaign"
        describedby="add people to campaign modal"
      >
        <DialogContentText>
          Search for existing people to add to campaign
        </DialogContentText>

        <div style={{ height: 15 }} />

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
          <Button onClick={handleAddPeopleClose}>Cancel</Button>
          <Button onClick={handleAddPeopleClose}>Add</Button>
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
