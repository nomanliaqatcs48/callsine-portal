import React, { useMemo } from "react";

export const _columns = () => {
  return useMemo(
    () => [
      {
        Header: "File",
        accessor: "file",
      },
    ],
    []
  );
};
