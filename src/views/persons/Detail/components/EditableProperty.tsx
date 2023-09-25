import { Button, TableCell } from "@mui/material";
import React from "react";
import { devLog } from "src/helpers/logs";

interface EditablePropertyProps {
  item: any;
  editMode: boolean;
  isActive: boolean;
  onClick: () => void;
}

export const EditableProperty: React.FC<EditablePropertyProps> = ({
  item,
  editMode = false,
  isActive = false,
  onClick,
}) => {
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

  const handleSave = (key: string, isAddress: boolean) => {
    devLog(() => {
      if (isAddress) {
        console.log("address", city, state);
      } else {
        console.log(key, ":", value);
      }
    });
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
                isActive ? "tw-bg-white" : "tw-bg-[#F5F5F5]"
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
                isActive ? "tw-bg-white" : "tw-bg-[#F5F5F5]"
              }`}
              placeholder="State"
              value={value.state}
              onChange={handleChangeState}
            />
          </TableCell>
          {isActive && (
            <TableCell align="right" className="tw-w-[40px] tw-border-0">
              <Button onClick={() => handleSave(item.key, true)}>Save</Button>
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
              isActive ? "tw-bg-white" : "tw-bg-[#F5F5F5]"
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
        {isActive && (
          <TableCell align="right" className="tw-w-[40px] tw-border-0">
            <Button onClick={() => handleSave(item.key, false)}>Save</Button>
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
