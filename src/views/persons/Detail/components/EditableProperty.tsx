import { LoadingButton } from "@mui/lab";
import { TableCell } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { patchPersonDetailService } from "src/services/persons.service";

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
  }, [isActive]);

  const [city, setCity] = React.useState("");

  const [state, setState] = React.useState("");

  const [newValue, setNewValue] = React.useState(null);

  const value = React.useMemo(() => {
    return newValue !== null ? newValue : item.value || "";
  }, [item.value, newValue]);

  const handleChange = (e: any) => {
    setNewValue(e.target.value);
  };

  const handleChangeCity = (e: any) => {
    setCity(e.target.value);
  };

  const handleChangeState = (e: any) => {
    setState(e.target.value);
  };

  const handleSave = async (key: string, isAddress: boolean) => {
    if (isAddress) {
      const payload = { city, state };
      mutate({ personId, payload });
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

      mutate({ personId, payload });
    }
  };

  if (editMode) {
    if (item.key === "address") {
      return (
        <>
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
              value={value.city}
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
              value={value.state}
              onChange={handleChangeState}
            />
          </TableCell>
          {activeField && (
            <TableCell align="right" className="tw-w-[40px] tw-border-0">
              <LoadingButton
                loading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSave(item.key, true);
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
