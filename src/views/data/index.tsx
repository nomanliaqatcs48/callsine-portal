import React, { useEffect, useState } from "react";
import { getUserDataService } from "../../services/users.service";
import { devLog, devLogError } from "../../helpers/logs";

const Data = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filters, setFilters] = React.useState<any>({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      let response = await getUserDataService(filters, searchValue);
      if (response) {
        devLog("getUsers", response);
      }
    } catch (e: any) {
      devLogError("e", e.response);
    }
  };

  return (
    <>
      <div>this is data page</div>
    </>
  );
};

export default Data;
