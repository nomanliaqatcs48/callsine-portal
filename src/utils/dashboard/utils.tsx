import React, { useMemo } from "react";

export const _columns = () => {
  return useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableSortBy: true,
      },
      {
        Header: "Person",
        accessor: "person",
        disableSortBy: true,
      },
    ],
    []
  );
};
