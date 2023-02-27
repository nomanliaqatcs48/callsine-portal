import React, { useEffect, useState } from "react";
import MyTable from "../../../../ui-component/tables/MyTable";
import { devLogError } from "../../../../helpers/logs";
import { usePeopleTab } from "../hooks/usePeopleTab";

const People = () => {
  const { _columns } = usePeopleTab();
  const [peopleData, setPeopleData] = useState<any[]>([]);
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
      let res = {
        data: [
          {
            id: 1,
            name: "Ken Vilar",
            step: "",
            stage: "",
            status: "active",
            stats: "",
            assignee: "",
            owner: "",
            last_contacted: "2023-01-01T17:06:11.224927Z",
            created_date: "2023-01-01T17:06:11.224927Z",
            modified_date: "2023-02-15T17:06:11.224927Z",
          },
        ],
      };
      if (res?.data) {
        setPeopleData(res.data);
      }
    } catch (e: any) {
      devLogError(e.response);
    }
  };
  return (
    <MyTable
      columns={_columns}
      data={peopleData}
      totalItems={total || 0}
      tableName="CampaignPeopleTable"
      tableClassName="table-campaign-people gray-header table-sm"
      isTableLoading={isLoading?.table}
      filters={filters}
      setFilters={setFilters}
      removePageSizeDropdown={false}
      isResponsive={true}
      // topContent={renderSearch}
      // setSortedId={setSortedId}
      // setIsOrderDesc={setIsOrderDesc}
      //
      // sortedId={sortedId}
      // isOrderDesc={isOrderDesc}
    />
  );
};

export default People;