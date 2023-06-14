import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReactSelect from "./ReactSelect";
import React from "react";

type FilterProps = {
  id: string;
  showLabel: boolean;
  labelText: any;
  data: any[];
  onChange: any;
};

const Filter = ({ id, showLabel, labelText, data, onChange }: FilterProps) => {
  return (
    <>
      {showLabel && (
        <label
          htmlFor={id}
          className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-start tw-font-medium"
        >
          {labelText}
        </label>
      )}
      <div className="tw-relative">
        <ReactSelect
          name={id}
          className="basic-single tw-cursor-pointer"
          variant="normal"
          placeholder="Please select"
          isClearable={true}
          isSearchable={true}
          options={data}
          onChange={onChange}
          styles={selectStyles}
        />
        {/*<select
          id={id}
          className="tw-bg-white tw-border tw-border-[#f3f3f3] tw-text-gray-900 tw-text-xs tw-rounded-md tw-block tw-w-full tw-p-2.5 tw-appearance-none hover:tw-border-blue-300 focus:tw-border-blue-300 focus:tw-outline-none"
          defaultValue=""
        >
          {data?.length > 0 &&
            data.map((item: any, idx: number) => {
              return (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              );
            })}

          {data?.length === 0 &&
            data.map((item, idx) => {
              return (
                <option key={idx} value="" disabled>
                  No data yet
                </option>
              );
            })}
        </select>*/}

        {/*<KeyboardArrowDownIcon
          fontSize="small"
          className="tw-absolute tw-top-[8px] tw-right-[5px]"
        />*/}
      </div>
    </>
  );
};

const selectStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "white",
    boxShadow: "none",
    border: "1px solid #C7C7C7",
    ":hover": {
      borderColor: "inherit",
    },
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#1a76d2"
        : isFocused
        ? "white"
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? "white"
        : isFocused
        ? "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "pointer",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? data.color : undefined,
      },
    };
  },
  menuList: (styles: any) => ({
    ...styles,
    fontSize: 12,
  }),
  input: (styles: any) => ({ ...styles, fontSize: 12 }),
  placeholder: (styles: any) => ({ ...styles, fontSize: 12 }),
  singleValue: (styles: any, { data }: any) => ({ ...styles, fontSize: 12 }),
  indicatorSeparator: (
    styles: any,
    { isDisabled, isFocused, innerProps }: any
  ) => ({ ...styles, display: "none" }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    padding: 2,
    svg: {
      width: 16,
    },
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    padding: 2,
    svg: {
      width: 16,
    },
  }),
};

export default Filter;
