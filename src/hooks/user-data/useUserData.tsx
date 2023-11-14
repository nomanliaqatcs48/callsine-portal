import React, { useEffect, useState } from "react";
import { getUserDataService } from "../../services/users.service";
import { devLog, devLogError } from "../../helpers/logs";
import { Divider } from "@mui/material";

export const useUserData = (load: boolean = true) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [sortedId, setSortedId] = useState<string>("");
  const [isOrderDesc, setIsOrderDesc] = useState<any>("");

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
      let response = await getUserDataService(
        filters,
        searchValue,
        sortedId,
        isOrderDesc
      );
      if (response) {
        devLog(() => {
          console.log("getUsers", response);
        });
        setData(response?.data?.results);
        setTotal(response?.data?.results?.length || 0);
        setIsLoading((prev: any) => ({ ...prev, table: false, onPage: false }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.error("e", e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, table: false, onPage: false }));
    }
  };

  useEffect(() => {
    getUsers();
  }, [sortedId, isOrderDesc]);

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
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
    isLoading,
    setIsLoading,
    getUsers,
    MyDivider,
    selectedFlatRows,
    setSelectedFlatRows,
  };
};
