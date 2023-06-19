import React, { useEffect, useState } from "react";
import { getUserDataService } from "../../services/users.service";
import { devLog, devLogError } from "../../helpers/logs";
import { Divider } from "@mui/material";

export const useUserData = (load: boolean = true) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filters, setFilters] = React.useState<any>({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = React.useState({
    onPage: true,
    table: false,
  });
  const [selectedFlatRows, setSelectedFlatRows] = useState<any[]>([]);

  useEffect(() => {
    if (load) {
      getUsers();
    }
  }, [load]);

  const getUsers = async () => {
    setIsLoading((prev: any) => ({ ...prev, table: true }));
    try {
      let response = await getUserDataService(filters, searchValue);
      if (response) {
        devLog(() => {
          console.log("getUsers", response);
        });
        setData(response?.data?.results);
        setTotal(response?.data?.results?.length || 0);
        setIsLoading((prev: any) => ({ ...prev, table: false, onPage: false }));
      }
    } catch (e: any) {
      devLogError("e", e.response);
      setIsLoading((prev: any) => ({ ...prev, table: false, onPage: false }));
    }
  };

  const MyDivider = () => {
    return (
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="tw-hidden lg:tw-block"
        sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
      />
    );
  };

  return {
    data,
    setData,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getUsers,
    MyDivider,
    selectedFlatRows,
    setSelectedFlatRows,
  };
};
