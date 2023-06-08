type SelectItemTypes = {
  prompts: any[];
};

const SelectItem = ({ prompts }: SelectItemTypes) => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
        <div className="tw-text-xl tw-py-10 tw-text-[#99a9be] tw-font-semibold">
          {prompts?.length === 0 && "Empty data"}
          {prompts?.length > 0 && "Select an email"}
        </div>
      </div>
    </>
  );
};

export default SelectItem;
