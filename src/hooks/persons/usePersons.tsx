import React, { useEffect, useState } from "react";
import { devLog, devLogError } from "../../helpers/logs";
import { getPeopleService } from "../../services/persons.service";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import { useQuery } from "@tanstack/react-query";

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
  const [searchFilterValue, setSearchFilterValue] = useState({
    title: "",
    company: "",
    industry: "",
  });

  devLog(() => {
    console.log("sortedId", sortedId);
  });

  const getPeople = async () => {
    try {
      let res = await getPeopleService(
        filters,
        searchValue,
        sortedId,
        isOrderDesc,
        searchFilterValue
      );
      if (res?.data) {
        devLog(() => {
          console.log("res?.data", res?.data);
        });
        // setTotal(res.data?.count);
        // setPersonsData(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
        // removeBodyLoader();
        return res.data;
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      return [];
    }
  };

  const {
    data: _personsData,
    isLoading: isFetchingPersons,
    refetch: refetchPersons,
  } = useQuery({
    queryKey: ["persons"],
    queryFn: getPeople,
    staleTime: 30000,
  });

  useEffect(() => {
    if (_personsData) {
      setPersonsData(_personsData?.results);
      setTotal(_personsData?.count);
    }
  }, [_personsData, _personsData?.count, _personsData?.results]);

  useEffect(() => {
    if (isFetchingPersons) {
      insertBodyLoader();
    } else {
      removeBodyLoader();
    }
  }, [isFetchingPersons]);

  useEffect(() => {
    refetchPersons();
  }, [filters, sortedId, isOrderDesc, refetchPersons]);

  return {
    isFetchingPersons,
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
    searchFilterValue,
    setSearchFilterValue,
  };
};
