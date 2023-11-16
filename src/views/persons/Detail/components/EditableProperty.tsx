import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { TableCell } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { patchPersonDetailService } from "src/services/persons.service";
import { Alert, Snackbar } from "@mui/material";

interface EditablePropertyProps {
  personId: number;
  item: any;
  editMode: boolean;
  isActive: boolean;
  onClick: () => void;
}

export const EditableProperty: React.FC<EditablePropertyProps> = ({
  personId,
  item,
  editMode = false,
  isActive = false,
  onClick,
}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { personId: number; payload: any }) => {
      return patchPersonDetailService(data.personId, data.payload);
    },
  });

  const [activeField, setActiveField] = React.useState(false);

  React.useEffect(() => {
    setActiveField(isActive);

    // Populate address fields if in edit mode
    if (editMode && item.key === "address") {
      setCity(item.value.person_city || "");
      setState(item.value.state || "");
    }
  }, [isActive, editMode, item]);

  const [person_city, setCity] = React.useState("");

  const [state, setState] = React.useState("");

  const [newValue, setNewValue] = React.useState(null);

  const [alertMessage, setAlertMessage] = React.useState({
    open: false,
    error: false,
    message: "",
  });

  const value = React.useMemo(() => {
    return newValue !== null ? newValue : item.value || "";
  }, [item.value, newValue]);

  const handleChange = (e: any) => {
    setNewValue(e.target.value);
  };

  const handleChangeCity = (e: any) => {
    console.log("CITY CHAGING ", e.target.value);
    setCity(e.target.value);
  };

  const handleChangeState = (e: any) => {
    setState(e.target.value);
  };

  const closeHandleAlert = () => {
    setAlertMessage((prevAlertMessage) => ({
      ...prevAlertMessage,
      open: false,
    }));
  };

  const validateInput = (value: any, key: any) => {
    const regexValidation = /^[a-zA-Z0-9\s]{1,40}$/;
    const phoneRegex = /^[\d()+\-.\s]{8,20}$/;

    if (value != null) {
      if (key === "phone" && !phoneRegex.test(value)) {
        setAlertMessage({
          open: true,
          error: true,
          message: "Invalid phone number. Please enter a valid phone number.",
        });
        return false;
      }

      if (key === "job_title" && value.length > 30) {
        setAlertMessage({
          open: true,
          error: true,
          message: "Invalid job title. It should be up to 30 characters long.",
        });
        return false;
      }

      if (
        key !== "phone" &&
        key !== "job_title" &&
        !regexValidation.test(value)
      ) {
        setAlertMessage({
          open: true,
          error: true,
          message: `Invalid ${key}. It should contain only letters and be up to 20 characters long.`,
        });
        return false;
      }
    }

    return true;
  };

  const handleSave = async (key: string, isAddress: boolean) => {
    if (!validateInput(newValue, key)) {
      return;
    }
    if (
      isAddress &&
      !validateInput(person_city, "person_city") &&
      !validateInput(state, "state")
    ) {
      return;
    }

    if (isAddress) {
      const payload = { person_city, state };
      mutate({ personId, payload });
      setAlertMessage({
        open: true,
        error: false,
        message: "Successfully saved!",
      });
    } else if (newValue) {
      let payload = {};

      if (key.includes("org")) {
        payload = {
          org: {
            [key.split(".")[1]]: newValue,
          },
        };
      } else {
        payload = {
          [key]: newValue,
        };
      }
      if (validateInput(newValue, key)) {
        mutate({ personId, payload });

        setAlertMessage({
          open: true,
          error: false,
          message: "Successfully saved!",
        });
      }
      // mutate({ personId, payload });
    }
  };

  if (editMode) {
    if (item.key === "address") {
      return (
        <>
          <Snackbar
            open={alertMessage.open}
            autoHideDuration={6000}
            onClose={() => closeHandleAlert()}
          >
            <Alert
              onClose={() => closeHandleAlert()}
              severity={
                alertMessage && alertMessage.error ? "error" : "success"
              }
            >
              {alertMessage.message}
            </Alert>
          </Snackbar>
          <TableCell
            align="right"
            className="tw-text-left tw-text-black tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-border-b-0 tw-p-0 tw-py-[10px]"
            onClick={onClick}
          >
            <input
              type="text"
              name={item.key}
              className={`tw-rounded-[10px] tw-px-[10px] tw-py-[5px] tw-mb-[10px] ${
                activeField ? "tw-bg-white" : "tw-bg-[#F5F5F5]"
              }`}
              placeholder="City"
              value={person_city}
              onChange={handleChangeCity}
            />
            <br />
            <input
              type="text"
              name={item.key}
              className={`tw-rounded-[10px] tw-px-[10px] tw-py-[5px] ${
                activeField ? "tw-bg-white" : "tw-bg-[#F5F5F5]"
              }`}
              placeholder="State"
              value={state}
              onChange={handleChangeState}
            />
          </TableCell>
          {activeField && (
            <TableCell align="right" className="tw-w-[40px] tw-border-0">
              <LoadingButton
                loading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSave(item.key, item.key === "address");
                }}
                startIcon={<SaveIcon />}
              >
                Save
              </LoadingButton>
            </TableCell>
          )}
        </>
      );
    }
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
        <TableCell
          align="right"
          className="tw-text-left tw-text-black tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-border-b-0 tw-p-0"
          onClick={onClick}
        >
          <input
            type="text"
            name={item.key}
            className={`tw-rounded-[10px] tw-px-[10px] tw-py-[5px] ${
              activeField ? "tw-bg-white" : "tw-bg-[#F5F5F5]"
            } `}
            placeholder={item.key
              .split(/[_.]/)
              .map(
                (s: string) =>
                  s.charAt(0).toUpperCase() + s.substring(1, s.length)
              )
              .join(" ")}
            value={value}
            onChange={handleChange}
          />
        </TableCell>
        {activeField && (
          <TableCell align="right" className="tw-w-[40px] tw-border-0">
            <LoadingButton
              loading={isLoading}
              startIcon={<SaveIcon />}
              onClick={(e) => {
                e.preventDefault();
                handleSave(item.key, false);
              }}
            >
              Save
            </LoadingButton>
          </TableCell>
        )}
      </>
    );
  }

  return (
    <TableCell
      align="right"
      className="tw-text-left tw-text-black tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-border-b-0 tw-p-0"
    >
      {item.second}
    </TableCell>
  );
};
