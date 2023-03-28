import React, { useEffect } from "react";
import { devLogError } from "../../helpers/logs";
import { getMailAccountsService } from "../../services/mail-accounts.service";

export const useMailAccounts = (open: boolean = true) => {
  const [mailAccountsData, setMailAccountsData] = React.useState<any[]>([]);
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

  useEffect(() => {
    if (open) {
      getMailAccounts();
    }
  }, [open, filters]);

  const getMailAccounts = async () => {
    setIsLoading((prev: any) => ({ ...prev, table: true }));
    try {
      let res = await getMailAccountsService(filters, searchValue);
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
    } catch ({ response }) {
      devLogError(response);
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
    getMailAccounts,
  };
};
