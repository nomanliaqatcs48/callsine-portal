import React, { useEffect, useState } from "react";
import { devLog, devLogError } from "../../helpers/logs";
import { getPeopleService } from "../../services/persons.service";

export const usePersons = (
  load: boolean = true,
  filtersParam: any = {
    limit: 10,
    offset: 0,
  }
) => {
  const [personsData, setPersonsData] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = React.useState<any>(filtersParam);
  const [sortedId, setSortedId] = useState<string>("");
  const [isOrderDesc, setIsOrderDesc] = useState<any>("");
  const [isLoading, setIsLoading] = React.useState({
    onPage: true,
    table: false,
    search: false,
  });
  const [selectedPersonRows, setSelectedPersonRows] = useState<any[]>([]);

  devLog(() => {
    console.log("sortedId", sortedId);
  });

  useEffect(() => {
    if (load) {
      getPeople();
    }
  }, [load, filters, sortedId, isOrderDesc]);

  const getPeople = async () => {
    try {
      let res = await getPeopleService(
        filters,
        searchValue,
        sortedId,
        isOrderDesc
      );
      if (res?.data) {
        devLog(() => {
          console.log("res?.data", res?.data);
        });
        setTotal(res.data?.count);
        setPersonsData(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  return {
    personsData,
    setPersonsData,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    selectedPersonRows,
    setSelectedPersonRows,
    getPeople,
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
  };
};
