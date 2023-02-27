import React, { useState } from "react";

export const usePersons = () => {
  const [personsData, setPersonsData] = useState<any[]>([
    {
      id: 1,
      first_name: "Ken",
      last_name: "Vilar",
      email: "kvilar@unionresolute.com",
      created_date: "2023-01-01T17:06:11.224927Z",
      modified_date: "2023-02-15T17:06:11.224927Z",
    },
    {
      id: 2,
      first_name: "Roselle",
      last_name: "Ebarle",
      email: "rebarle@unionresolute.com",
      created_date: "2023-01-02T17:06:11.224927Z",
      modified_date: "2023-02-16T17:06:11.224927Z",
    },
    {
      id: 3,
      first_name: "John",
      last_name: "Doe",
      email: "jdoe@unionresolute.com",
      created_date: "2023-01-03T17:06:11.224927Z",
      modified_date: "2023-02-17T17:06:11.224927Z",
    },
  ]);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<any>({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState({
    onPage: true,
    table: false,
  });

  return {
    personsData,
    setPersonsData,
    total,
    setTotal,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
  };
};
