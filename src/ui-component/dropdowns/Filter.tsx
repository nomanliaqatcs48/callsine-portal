import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type FilterProps = {
  id: string;
  showLabel: boolean;
  labelText: any;
  data: any[];
};

const Filter = ({ id, showLabel, labelText, data }: FilterProps) => {
  return (
    <>
      {showLabel && (
        <label
          htmlFor={id}
          className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-start tw-text-xs tw-font-medium"
        >
          {labelText}
        </label>
      )}
      <div className="tw-relative">
        <select
          id={id}
          className="tw-bg-white tw-border tw-border-[#f3f3f3] tw-text-gray-900 tw-text-xs tw-rounded-md tw-block tw-w-full tw-p-2.5 tw-appearance-none hover:tw-border-blue-300 focus:tw-border-blue-300 focus:tw-outline-none"
        >
          {data?.length > 0 &&
            data.map((item: any, idx: number) => {
              return (
                <option selected value={item.value}>
                  {item.label}
                </option>
              );
            })}

          {data?.length === 0 &&
            data.map(() => {
              return (
                <option selected disabled>
                  No data yet
                </option>
              );
            })}
        </select>

        <KeyboardArrowDownIcon
          fontSize="small"
          className="tw-absolute tw-top-[8px] tw-right-[5px]"
        />
      </div>
    </>
  );
};

export default Filter;
