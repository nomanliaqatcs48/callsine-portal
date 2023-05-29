import Select from "react-select";

type ReactSelectTypes = {
  name: string;
  [x: string]: any;
};

const ReactSelect = ({ name, ...props }: ReactSelectTypes) => {
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

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      name={name}
      defaultValue={""}
      options={[]}
      isDisabled={false}
      isLoading={false}
      isClearable={false}
      isSearchable={true}
      isRtl={false}
      styles={selectStyles}
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
    />
  );
};

export default ReactSelect;
