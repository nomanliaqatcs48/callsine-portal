import React, { useEffect, useState } from "react";
import MyTable from "../../../../ui-component/tables/MyTable";
import { devLogError } from "../../../../helpers/logs";
import { useEmailsTab } from "../hooks/useEmailsTab";

const Emails = () => {
  const { _columns } = useEmailsTab();
  const [emailsData, setEmailsData] = useState<any[]>([]);
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
    getEmails();
  }, []);

  const getEmails = async () => {
    try {
      let res = {
        data: [
          {
            id: 1,
            to: "kvilar@unionresolute.com",
            subject: "",
            status: "",
            sent_at: "",
            opens: "",
            clicks: "",
            replies: "",
            created_date: "2023-01-01T17:06:11.224927Z",
            modified_date: "2023-02-15T17:06:11.224927Z",
          },
        ],
      };
      if (res?.data) {
        setEmailsData(res.data);
      }
    } catch (e: any) {
      devLogError(e.response);
    }
  };
  return (
    <MyTable
      columns={_columns}
      data={emailsData}
      totalItems={total || 0}
      tableName="CampaignEmailTable"
      tableClassName="table-campaign-email gray-header table-sm"
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

export default Emails;
