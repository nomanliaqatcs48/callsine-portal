import React, { useEffect, useState } from "react";
import { getSequenceEventScheduledEmailService } from "../../services/sequences.service";
import { devLog, devLogError } from "../../helpers/logs";

export const useDashboard = (
  load: boolean = true,
  filtersParam: any = {
    limit: 10,
    offset: 0,
  }
) => {
  const [scheduledEmails, setScheduledEmails] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = useState<any>(filtersParam);
  const [selectedFlatRows, setSelectedFlatRows] = useState<any[]>([]);
  const [sortedId, setSortedId] = useState<string>("");
  const [isOrderDesc, setIsOrderDesc] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    table: false,
  });

  useEffect(() => {
    setIsLoading((prev: any) => ({ ...prev, onPage: false }));
  }, []);

  useEffect(() => {
    getScheduledEmails(filters);
  }, [filters]);

  const getScheduledEmails = async (_filters: any = null) => {
    try {
      let response = await getSequenceEventScheduledEmailService(
        _filters || filters,
        searchValue,
        "true"
      );
      if (response?.data) {
        devLog(() => {
          console.log(response.data);
        });
        setScheduledEmails(response.data?.results);
        setTotal(response.data?.count);
        setIsLoading((beforeVal: any) => ({
          ...beforeVal,
          onPage: false,
          table: false,
        }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.log(e?.response);
      });
      setIsLoading((beforeVal: any) => ({
        ...beforeVal,
        onPage: false,
        table: false,
      }));
    }
  };

  return {
    isLoading,
    setIsLoading,
    getScheduledEmails,
    scheduledEmails,
    setScheduledEmails,
    total,
    setTotal,
    filters,
    setFilters,
    searchValue,
    setSearchValue,
    selectedFlatRows,
    setSelectedFlatRows,
  };
};
