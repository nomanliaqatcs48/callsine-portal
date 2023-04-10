import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { devLogError } from "../../helpers/logs";
import {getPlaybooks, getPromptsService} from "../../services/prompts.service";

type PromptsTypes = {
  onChange: any;
  [x: string]: any;
};

const Prompts = ({ onChange, ...props }: PromptsTypes) => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filters, setFilters] = React.useState<any>({
    limit: 9999,
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
      let res = await getPlaybooks(filters, searchValue);
      if (res?.data) {
        setPrompts(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch ({ response }) {
      devLogError("e", response);
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const handleChangePrompt = (e: SelectChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <FormControl
      fullWidth
      // error={!!errors.prompts}
      margin="dense"
      required
      // disabled={mailAccountLoading?.form}
      {...props}
    >
      <InputLabel id="prompts-label">
        {prompts?.length > 0 ? "Playbooks" : "No data available"}
      </InputLabel>
      <Select
        labelId="prompts-label"
        id="prompts"
        label="Prompts"
        onChange={handleChangePrompt}
      >
        {prompts.map((o) => {
          return (
            <MenuItem value={o.id} key={o.id} style={{ whiteSpace: "normal" }}>
              <div>{o.name}</div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Prompts;
