import React, { useRef } from "react";
import { Input } from "@mui/material";

const SearchField = ({ searchValue, onChange }: any) => {
  const searchInputRef = useRef<any>(null);

  return (
    <>
      <Input
        placeholder="Search..."
        type="search"
        ref={searchInputRef}
        inputProps={{ "aria-label": "description" }}
        value={searchValue || ""}
        onChange={(e) => {
          onChange(e);
          searchInputRef.current.focus();
        }}
        sx={{ width: 250 }}
      />
    </>
  );
};

export default SearchField;
