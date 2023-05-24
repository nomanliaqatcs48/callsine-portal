import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useAsyncDebounce } from "react-table";
import { useMailAccounts } from "../../hooks/mail-accounts/useMailAccounts";
import CreateOrEditMailAccount from "../../ui-component/buttons/CreateOrEditMailAccount";
import MainCard from "../../ui-component/cards/MainCard";
import TotalListSmallCard from "../../ui-component/cards/TotalListSmallCard";
import SearchField from "../../ui-component/forms/SearchField";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/mail-accounts/utils";
import CreateOrEditPerson from "../../ui-component/buttons/CreateOrEditPerson";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ImportPeople from "../../ui-component/buttons/ImportPeople";
import ExportPeople from "../../ui-component/buttons/ExportPeople";
import DeleteSelectedPeople from "../../ui-component/buttons/DeleteSelectedPeople";
import ExportMailAccounts from "../../ui-component/buttons/ExportMailAccounts";

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
    <>
      <Typography className="tw-text-4xl">Mail Accounts</Typography>
      <Grid className="tw-my-5" />
      {/*<Grid
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
      </Grid>*/}
      {/*<div style={{ height: 3 }} />*/}
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
      <Paper elevation={0} className="tw-pt-4">
        <Grid container>
          <Grid item xs={12} lg={2}>
            <Typography className="tw-text-lg tw-font-medium tw-pl-3">
              Accounts
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={10}
            className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-x-1 lg:tw-items-center lg:tw-justify-end lg:tw-px-3"
          >
            <CreateOrEditMailAccount
              btnText={
                <>
                  <PersonAddAlt1Icon
                    color="primary"
                    sx={{ fontSize: 15 }}
                    className="tw-mr-2"
                  />
                  Add Users
                </>
              }
              onSubmit={getMailAccounts}
              onClick={() => null}
            />

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-hidden lg:tw-block"
              sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
            />

            <ExportMailAccounts data={mailAccountsData} />

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-hidden lg:tw-block"
              sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
            />

            <DeleteSelectedPeople selectedPeople={[]} onLoadApi={() => null} />

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-hidden lg:tw-block"
              sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
            />

            <Button
              onClick={() => null}
              disabled={false}
              variant="text"
              className="tw-text-[#3fb0d5] hover:tw-bg-transparent focus:tw-bg-transparent active:tw-bg-transparent tw-cursor-auto"
            >
              {total || 0} Mail{" "}
              {total === 0 || total === 1 ? "Account" : "Accounts"}
            </Button>
          </Grid>
        </Grid>
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
      </Paper>
    </>
  );
};

export default MailAccountsPage;
