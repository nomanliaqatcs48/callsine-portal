import React, { useMemo } from "react";

export const _columns = () => {
  return useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "user.first_name",
        Cell: (cell: any) => {
          return `${cell?.value} ${cell?.row?.original?.user?.last_name}`;
        },
      },
      {
        Header: "File",
        accessor: "file",
      },
    ],
    []
  );
};
