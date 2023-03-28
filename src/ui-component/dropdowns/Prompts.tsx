import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { devLog } from "../../helpers/logs";
import { getPromptsService } from "../../services/prompts.service";

type PromptsTypes = {};

const Prompts = ({}: PromptsTypes) => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filters, setFilters] = React.useState<any>({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  useEffect(() => {
    getPrompts();
  }, []);

  const getPrompts = async () => {
    try {
      let res = await getPromptsService(filters, searchValue);
      if (res?.data) {
        setPrompts(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch ({ response }) {
      devLog("e", response);
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const handleChangePrompt = () => {
    //
  };

  return (
    <FormControl
      fullWidth
      // error={!!errors.provider}
      margin="dense"
      required
      // disabled={mailAccountLoading?.form}
    >
      <InputLabel id="provider-label">Prompts</InputLabel>
      <Select
        labelId="provider-label"
        id="provider"
        label="Provider"
        onChange={handleChangePrompt}
      >
        <MenuItem value="gmail">GMail</MenuItem>
        <MenuItem value="outlook">Outlook</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Prompts;
