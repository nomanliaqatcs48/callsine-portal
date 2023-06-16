import React, { useEffect, useState } from "react";
import {
  getPersonDetailService,
  getPeopleService,
} from "../../../services/persons.service";
import { devLogError } from "../../../helpers/logs";

export const usePersons = (load: boolean = true) => {
  const [personsData, setPersonsData] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = React.useState<any>({
    limit: 10,
    offset: 0,
  });
  const [isLoading, setIsLoading] = React.useState({
    onPage: true,
    table: false,
    search: false,
  });
  const [selectedPersonRows, setSelectedPersonRows] = useState<any[]>([]);

  useEffect(() => {
    if (load) {
      getPeople();
    }
  }, [load, filters]);

  const getPeople = async () => {
    try {
      let res = await getPeopleService(filters, searchValue);
      if (res?.data) {
        setTotal(res.data?.count);
        setPersonsData(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(e.response);
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
  };
};
