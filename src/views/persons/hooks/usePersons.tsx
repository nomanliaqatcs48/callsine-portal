import React, { useState } from "react";

export const usePersons = () => {
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

  return { total, setTotal, filters, setFilters, isLoading, setIsLoading };
};
