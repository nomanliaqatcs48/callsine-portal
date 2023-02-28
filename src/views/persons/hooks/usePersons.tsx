import React, { useEffect } from "react";
import {
  personDetailService,
  personsService,
} from "../../../services/persons.service";
import { devLogError } from "../../../helpers/logs";

export const usePersons = () => {
  const [personsData, setPersonsData] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);
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
    getPeople();
  }, []);

  const getPeople = async () => {
    try {
      let res = await personsService();
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
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getPeople,
  };
};
