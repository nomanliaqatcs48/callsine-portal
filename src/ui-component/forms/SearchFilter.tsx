import { useRef } from "react";

type SearchFilterTypes = {
  searchValue: string | null;
  onChange: any;
  [x: string]: any;
};

const SearchFilter = ({
  searchValue,
  onChange,
  ...props
}: SearchFilterTypes) => {
  const searchInputRef = useRef<any>(null);

  return (
    <>
      <input
        type="Search"
        autoComplete="off"
        id="search-people"
        placeholder="Search"
        className="tw-bg-veryPrimaryLight tw-border tw-border-[#e8eafa] tw-border-opacity-30 tw-text-gray-900 tw-text-xs tw-rounded-md tw-font-medium tw-block tw-w-full tw-p-2.5 placeholder:tw-text-[0.85rem] placeholder:tw-font-medium hover:tw-border-blue-300 focus:tw-border-blue-300 focus:tw-outline-none"
        ref={searchInputRef}
        onChange={onChange}
        value={searchValue || ""}
        {...props}
      />
    </>
  );
};

export default SearchFilter;
