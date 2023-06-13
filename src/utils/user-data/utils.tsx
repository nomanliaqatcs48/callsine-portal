import React, { useMemo } from "react";

export const _columns = () => {
  return useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "user.first_name",
      },
      {
        Header: "Last Name",
        accessor: "user.last_name",
      },
      {
        Header: "File",
        accessor: "file",
      },
    ],
    []
  );
};
