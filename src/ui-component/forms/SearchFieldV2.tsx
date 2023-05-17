import React from "react";
import { Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchFieldV2 = () => {
  return (
    <>
      <label
        htmlFor="search-people"
        className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-start tw-text-xs tw-font-medium"
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
            className="tw-bg-veryPrimaryLight tw-border tw-border-[#e8eafa] tw-border-opacity-30 tw-text-gray-900 tw-text-xs tw-rounded-md tw-font-normal tw-block tw-w-full tw-p-2.5 tw-pl-10 placeholder:tw-text-[0.70rem] hover:tw-border-blue-300 focus:tw-border-blue-300 focus:tw-outline-none"
          />
          <SearchIcon
            fontSize="small"
            className="tw-absolute tw-top-[9px] tw-left-4 tw-opacity-30"
          />
        </div>
      </Grid>
    </>
  );
};

export default SearchFieldV2;
