import React, { useEffect, useState } from "react";
import { devLogError } from "../../helpers/logs";
import { getMailAccountsService } from "../../services/mail-accounts.service";

export const useMailAccounts = (
  load: boolean = true,
  filtersParam: any = {
    limit: 10,
    offset: 0,
    currentPage: 1,
  }
) => {
  const [mailAccountsData, setMailAccountsData] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filters, setFilters] = React.useState<any>(filtersParam);
  const [isLoading, setIsLoading] = React.useState({
    onPage: true,
    table: false,
  });
  const [selectedFlatRows, setSelectedFlatRows] = useState<any[]>([]);
  const [sortedId, setSortedId] = useState<string>("");
  const [isOrderDesc, setIsOrderDesc] = useState<any>("");

  useEffect(() => {
    if (load) {
      getMailAccounts();
    }
  }, [load, filters, sortedId, isOrderDesc]);

  const getMailAccounts = async () => {
    setIsLoading((prev: any) => ({ ...prev, table: true }));
    try {
      let res = await getMailAccountsService(
        filters,
        searchValue,
        sortedId,
        isOrderDesc
      );
      if (res?.data) {
        setMailAccountsData(res.data?.results);
        setTotal(res.data?.count);
        if (res.data?.count > 0 && !res.data?.results?.length) {
          // revert back
          setFilters({
            limit: 10,
            offset: 0,
            currentPage: 1,
          });
        }
        setIsLoading((prev: any) => ({ ...prev, table: false, onPage: false }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, table: false, onPage: false }));
    }
  };

  return {
    mailAccountsData,
    setMailAccountsData,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    selectedFlatRows,
    setSelectedFlatRows,
    getMailAccounts,
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
  };
};
