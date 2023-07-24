import React, { useEffect, useState } from "react";
import { useAsyncDebounce } from "react-table";
import { devLog, devLogError } from "../../helpers/logs";
import { dummyData } from "../../utils/playbooks/utils";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";

export const usePlaybook = (
  load: boolean = true,
  filtersParam: any = {
    limit: 10,
    offset: 0,
  }
) => {
  const [playbookData, setPlaybookData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>(filtersParam);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortedId, setSortedId] = useState<string>("");
  const [isOrderDesc, setIsOrderDesc] = useState<any>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    table: false,
    search: false,
  });

  useEffect(() => {
    if (load) {
      getAllPlaybook();
    }
  }, [load, filters, sortedId, isOrderDesc]);

  const getAllPlaybook = async () => {
    insertBodyLoader();
    try {
      let res = await dummyData();
      if (res?.data) {
        devLog(() => {
          console.log("res.data", res.data);
        });
        setTotal(res.data?.count);
        setPlaybookData(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
        removeBodyLoader();
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      removeBodyLoader();
    }
  };

  const handleSearchOnChange = useAsyncDebounce(async () => {
    getAllPlaybook();
  }, 1000);

  const handleSearchOnBeforeChange = (e: any) => {
    setIsLoading((prev: any) => ({ ...prev, search: true }));
    setSearchValue(e.target.value);
    void handleSearchOnChange();
  };

  return {
    playbookData,
    setPlaybookData,
    filters,
    setFilters,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
    selectedIndex,
    setSelectedIndex,
    selectedData,
    setSelectedData,
    isLoading,
    setIsLoading,
    getAllPlaybook,
    handleSearchOnChange,
    handleSearchOnBeforeChange,
  };
};
