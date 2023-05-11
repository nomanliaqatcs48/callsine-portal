import { Grid, Typography } from "@mui/material";
import React from "react";
import { useAsyncDebounce } from "react-table";
import { useMailAccounts } from "../../hooks/mail-accounts/useMailAccounts";
import CreateOrEditMailAccount from "../../ui-component/buttons/CreateOrEditMailAccount";
import MainCard from "../../ui-component/cards/MainCard";
import TotalListSmallCard from "../../ui-component/cards/TotalListSmallCard";
import SearchField from "../../ui-component/forms/SearchField";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/mail-accounts/utils";

const MailAccountsPage = () => {
  const {
    mailAccountsData,
    setMailAccountsData,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getMailAccounts,
  } = useMailAccounts();

  const handleSearchOnBeforeChange = (e: any) => {
    setIsLoading((prev: any) => ({ ...prev, search: true }));
    setSearchValue(e.target.value);
    void handleSearchOnChange();
  };

  const handleSearchOnChange = useAsyncDebounce(async () => {
    await setFilters({
      limit: 10,
      offset: 0,
      currentPage: 1,
    });
  }, 1000);

  return (
    <div>
      <Typography className="tw-text-4xl">Mail Accounts</Typography>
      <Grid className="tw-my-5" />
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <CreateOrEditMailAccount
          btnText="Add Mail Account"
          onSubmit={getMailAccounts}
          onClick={() => null}
          btnVariant="outlined"
        />
      </Grid>
      <div style={{ height: 3 }} />
      {/*<Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TotalListSmallCard
            isLoading={isLoading?.onPage}
            value={total}
            text="Total"
          />
        </Grid>
      </Grid>*/}
      <div style={{ height: 20 }} />
      {/*<Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <SearchField
          searchValue={searchValue}
          onChange={handleSearchOnBeforeChange}
        />
      </Grid>*/}
      <MyTable
        columns={_columns(getMailAccounts)}
        data={mailAccountsData}
        totalItems={total || 0}
        tableName="MailAccounts"
        tableClassName="table-mail-accounts gray-header table-sm"
        isTableLoading={isLoading?.table}
        filters={filters}
        setFilters={setFilters}
        removePageSizeDropdown={false}
        isResponsive={true}
        removeSelection={false}
        hiddenColumns={["last_name"]}
        // setSortedId={setSortedId}
        // setIsOrderDesc={setIsOrderDesc}
        //
        // sortedId={sortedId}
        // isOrderDesc={isOrderDesc}
      />
    </div>
  );
};

export default MailAccountsPage;
