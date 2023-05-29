import Select from "react-select";

type ReactSelectTypes = {
  name: string;
  variant: "normal" | "blue";
  [x: string]: any;
};

const ReactSelect = ({ name, variant, ...props }: ReactSelectTypes) => {
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
          ? "#ff003f"
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
    input: (styles: any) => ({ ...styles }),
    placeholder: (styles: any) => ({ ...styles }),
    singleValue: (styles: any, { data }: any) => ({ ...styles }),
  };

  const selectBlueStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "#1a76d2",
      boxShadow: "none",
      border: "1px solid #1a76d2",
      cursor: "pointer",
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
    input: (styles: any) => ({ ...styles }),
    placeholder: (styles: any) => ({
      ...styles,
      color: "white",
      fontSize: "0.7rem",
      fontWeight: 600,
    }),
    singleValue: (styles: any, { data }: any) => ({ ...styles }),
    indicatorSeparator: (
      styles: any,
      { isDisabled, isFocused, innerProps }: any
    ) => ({ ...styles, display: "none" }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: "white",
      ":hover": {
        color: "white",
      },
      svg: {
        width: 16,
      },
    }),
  };

  return (
    <Select
      className="basic-single tw-cursor-pointer"
      classNamePrefix="select"
      name={name}
      defaultValue={""}
      options={[]}
      isDisabled={false}
      isLoading={false}
      isClearable={true}
      isSearchable={true}
      isRtl={false}
      styles={variant === "normal" ? selectStyles : selectBlueStyles}
      onChange={(newValue, actionMeta) => {
        // devLog("Value Changed");
        // devLog(newValue);
        // devLog(`action: ${actionMeta.action}`);
        // devLog("===========");
      }}
      onInputChange={(inputValue: any, actionMeta: any) => {
        // devLog("Input Changed");
        // devLog(inputValue);
        // devLog(`action: ${actionMeta.action}`);
        // devLog("===========");
      }}
      {...props}
    />
  );
};

export default ReactSelect;
