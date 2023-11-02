import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { cacheTime } from "src/store/constant";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import {
  getPeopleService,
  personForceEnable,
} from "../../services/persons.service";
import { useUnreadCount } from "src/hooks/useUnreadCount";

export const usePersons = (
  load: boolean = true,
  filtersParam: any = {
    limit: 25,
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
  const [filterUserId, setFilterUserId] = useState<number | null>();
  const [schedEmailNull, setSchedEmailNull] = useState<boolean>(false);
  const [schedEmailNotNull, setSchedEmailNotNull] = useState<boolean>(false);
  const [schedEmailToday, setSchedEmailToday] = useState<boolean>(false);
  const [lastContactedToday, setLastContactedToday] = useState<boolean>(false);

  const { unreadEmails } = useUnreadCount();

  const makePeopleWithReplyToTop = (persons: any) => {
    const _unreadEmails = new Set(unreadEmails.map((item: any) => item.to));
    persons.sort((a: any, b: any) => {
      const isAUnread = _unreadEmails.has(a.work_email);
      const isBUnread = _unreadEmails.has(b.work_email);

      if (isAUnread && !isBUnread) {
        return -1; // a comes first
      }
      if (!isAUnread && isBUnread) {
        return 1; // b comes first
      }
      return 0; // no change in order
    });
    console.log({ persons });
    return persons;
  };
  const getPeople = async () => {
    try {
      let res = await getPeopleService(
        filters,
        searchValue,
        sortedId,
        isOrderDesc,
        searchFilterValue,
        filterUserId,
        schedEmailNull,
        schedEmailNotNull,
        schedEmailToday,
        lastContactedToday
      );
      if (res?.data) {
        console.log({ unreadEmails });
        console.log("PERSONS", res.data.results);
        const sortedResults = makePeopleWithReplyToTop(res.data.results);
        console.log({ sortedResults });
        setPersonsData(sortedResults);

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

  const updateForceEnable = async (person_id: number) => {
    try {
      let res = await personForceEnable(person_id);
      if(res.status === 200) {
        // console.log(res)
        refetchPersons();
      }      
    } catch (e) {
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
      if (_personsData?.results?.length > 0) {
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
  }, [
    filters,
    sortedId,
    isOrderDesc,
    filterUserId,
    refetchPersons,
    schedEmailNull,
    schedEmailNotNull,
    schedEmailToday,
    lastContactedToday,
  ]);

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
    setFilterUserId,
    setSchedEmailNull,
    setSchedEmailNotNull,
    setSchedEmailToday,
    setLastContactedToday,
    updateForceEnable
  };
};
