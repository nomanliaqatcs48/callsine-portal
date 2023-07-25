import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";

type SearchFieldV2Types = {
  onChange: any;
};

const SearchFieldV2 = ({ onChange }: SearchFieldV2Types) => {
  return (
    <>
      <label
        htmlFor="search-people"
        className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-start"
      >
        What are you looking for?
      </label>
      <Grid>
        <div className="tw-relative">
          <input
            type="search"
            autoComplete="off"
            id="search-people"
            placeholder="Search"
            className="tw-bg-veryPrimaryLight tw-border tw-border-[#e8eafa] tw-border-opacity-30 tw-text-gray-900 tw-text-[16px] tw-rounded-md tw-font-normal tw-block tw-w-full tw-p-2.5 tw-pl-10 placeholder:tw-text-[16px] placeholder:tw-font-normal hover:tw-border-blue-300 focus:tw-border-blue-300 focus:tw-outline-none"
            onChange={onChange}
          />
          <SearchIcon
            fontSize="small"
            className="tw-absolute tw-top-[9px] tw-left-4 tw-opacity-50"
          />
        </div>
      </Grid>
    </>
  );
};

export default SearchFieldV2;
