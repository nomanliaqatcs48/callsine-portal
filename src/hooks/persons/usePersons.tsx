import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import { devLog, devLogError } from "../../helpers/logs";
import { getPeopleService } from "../../services/persons.service";
import { cacheTime } from "src/store/constant";

export const usePersons = (
  load: boolean = true,
  filtersParam: any = {
    limit: 60,
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
        // Update state variables here
        setPersonsData(res.data.results);
        setTotal(res.data.count);
        setIsLoading((prev) => ({ ...prev, onPage: false }));
        return res.data;
      }
    } catch (e) {
      // Handle errors gracefully and provide feedback to the user
      setIsLoading((prev) => ({ ...prev, onPage: false }));
      // You can set an error state here if needed
      // setError(e);
      return null;
    }
  };

  const {
    data: _personsData,
    isLoading: isFetchingPersons,
    refetch: refetchPersons,
  } = useQuery({
    queryKey: ["persons"],
    queryFn: getPeople,
    staleTime: cacheTime,
  });

  useEffect(() => {
    if (_personsData) {
      if (_personsData?.results?.length > 1) {
        setPersonsData(_personsData?.results);
        setTotal(_personsData?.count);
      }
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
