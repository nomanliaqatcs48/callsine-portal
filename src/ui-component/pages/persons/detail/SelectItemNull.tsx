type SelectItemTypes = {
  prompts: any[];
  stringForEmpty: string;
  stringForNotEmpty: string;
};

const SelectItemNull = ({
  prompts,
  stringForEmpty,
  stringForNotEmpty,
}: SelectItemTypes) => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
        <div className="tw-text-xl tw-py-10 tw-text-[#99a9be] tw-font-semibold tw-mb-6">
          {prompts?.length === 0 && stringForEmpty}
          {prompts?.length > 0 && stringForNotEmpty}
        </div>
      </div>
    </>
  );
};

export default SelectItemNull;
