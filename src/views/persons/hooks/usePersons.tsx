import React, { useState } from "react";

export const usePersons = () => {
  const [personsData, setPersonsData] = useState<any[]>([
    {
      first_name: "Ken",
      last_name: "Vilar",
      email: "kvilar@unionresolute.com",
    },
    {
      first_name: "Roselle",
      last_name: "Ebarle",
      email: "rebarle@unionresolute.com",
    },
    {
      first_name: "John",
      last_name: "Doe",
      email: "jdoe@unionresolute.com",
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
