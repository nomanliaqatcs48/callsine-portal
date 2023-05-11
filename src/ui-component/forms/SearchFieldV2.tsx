import React from "react";
import { Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchFieldV2 = () => {
  return (
    <>
      <Typography className="tw-flex tw-flex-col tw-items-center tw-text-xs tw-font-medium">
        What are you looking for?
      </Typography>
      <Grid>
        <div className="tw-relative">
          <input
            type="text"
            autoComplete="off"
            id="search-people"
            placeholder="Search"
            className="tw-bg-veryPrimaryLight tw-border tw-border-[#e8eafa] tw-text-gray-900 tw-text-xs tw-rounded-lg tw-font-normal tw-block tw-w-full tw-p-2.5 tw-pl-12 hover:tw-border-blue-300 focus:tw-border-blue-300 focus:tw-outline-none"
          />
          <SearchIcon className="tw-absolute tw-top-[7px] tw-left-4 tw-opacity-30" />
        </div>
      </Grid>
    </>
  );
};

export default SearchFieldV2;
