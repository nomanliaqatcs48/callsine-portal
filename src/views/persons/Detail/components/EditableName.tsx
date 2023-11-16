import React from "react";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation } from "@tanstack/react-query";
import { patchPersonDetailService } from "src/services/persons.service";
import { Alert, Snackbar } from "@mui/material";

interface EditableNameProps {
  data: any;
  editMode: boolean;
}

const EditableName: React.FC<EditableNameProps> = ({ data, editMode }) => {
  const { mutate, isLoading: isSaving } = useMutation({
    mutationFn: (data: { personId: number; payload: any }) => {
      return patchPersonDetailService(data.personId, data.payload);
    },
  });

  const [firstName, setFirstName] = React.useState<string | null>(null);

  const [lastName, setLastName] = React.useState<string | null>(null);

  // const [open, setOpen] = React.useState(false);

  const [alertMessage, setAlertMessage] = React.useState({
    open: false,
    error: false,
    message: "",
  });

  const given = React.useMemo(() => {
    return firstName !== null ? firstName : data?.first_name;
  }, [data?.first_name, firstName]);

  const surname = React.useMemo(() => {
    return lastName !== null ? lastName : data?.last_name;
  }, [data?.last_name, lastName]);

  const handleOnSave = () => {
    const regex_validation = /^[\p{L} \u00f1\u00d1]+$/u;
    if (firstName != null) {
      if (!regex_validation.test(firstName)) {
        setAlertMessage({
          open: true,
          error: true,
          message:
            "Invalid first name. It should contain only letters and be up to 20 characters long.",
        });
        return;
      }
    }
    if (lastName != null) {
      if (!regex_validation.test(lastName)) {
        setAlertMessage({
          open: true,
          error: true,
          message:
            "Invalid last name. It should contain only letters and be up to 20 characters long.",
        });
        return;
      }
    }
    mutate({
      personId: data.id,
      payload: {
        first_name: given,
        last_name: surname,
      },
    });
    setAlertMessage({
      open: true,
      error: false,
      message: "Successfully save!.",
    });
  };

  const closeHandleAlert = () => {
    setAlertMessage((prevAlertMessage) => ({
      ...prevAlertMessage,
      open: false,
    }));
  };

  return (
    <>
      <Snackbar
        open={alertMessage.open}
        autoHideDuration={6000}
        onClose={() => closeHandleAlert()}
      >
        <Alert
          onClose={() => closeHandleAlert()}
          severity={alertMessage && alertMessage.error ? "error" : "success"}
        >
          {alertMessage.message}
        </Alert>
      </Snackbar>
      <input
        className="tw-w-[300px] tw-h-[40px] tw-border-2 tw-border-solid tw-border-[#E0E0E0] tw-rounded-md tw-py-1 tw-px-3 tw-text-[16px] tw-tracking-[0.32px] tw-text-black focus:tw-outline-none"
        value={given}
        onChange={(e) => {
          e.preventDefault();
          setFirstName(e.target.value);
        }}
        required
        placeholder="First Name"
      />
      <div className="tw-h-[10px]" />
      <input
        required
        className="tw-w-[300px] tw-h-[40px] tw-border-2 tw-border-solid tw-border-[#E0E0E0] tw-rounded-md tw-py-1 tw-px-3 tw-text-[16px] tw-tracking-[0.32px] tw-text-black focus:tw-outline-none"
        value={surname}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <LoadingButton
        loading={isSaving}
        startIcon={<SaveIcon />}
        onClick={(e) => {
          e.preventDefault();
          handleOnSave();
        }}
      >
        Save
      </LoadingButton>
    </>
  );
};

export default EditableName;
