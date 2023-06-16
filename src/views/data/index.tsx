import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/user-data/utils";
import { useUserData } from "../../hooks/user-data/useUserData";
import AddUserData from "../../ui-component/buttons/AddUserData";
import DeleteSelectedUserData from "../../ui-component/buttons/DeleteSelectedUserData";

const Data = () => {
  const {
    data,
    setData,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getUsers,
    MyDivider,
    selectedFlatRows,
    setSelectedFlatRows,
  } = useUserData();

  return (
    <>
      <Typography className="tw-text-4xl tw-text-black">Data</Typography>
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
              Data
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={10}
            className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-x-1 lg:tw-items-center lg:tw-justify-end lg:tw-px-3"
          >
            <AddUserData onLoadApi={getUsers} />

            <MyDivider />

            <DeleteSelectedUserData
              selectedRows={selectedFlatRows}
              onLoadApi={getUsers}
            />

            <MyDivider />

            <Button
              onClick={() => null}
              disabled={false}
              variant="text"
              className="tw-text-[#3fb0d5] hover:tw-bg-transparent focus:tw-bg-transparent active:tw-bg-transparent tw-cursor-auto"
            >
              {total || 0} Data
            </Button>
          </Grid>
        </Grid>
        <MyTable
          columns={_columns()}
          data={data}
          totalItems={total || 0}
          tableName="UserData"
          tableClassName="table-mail-accounts gray-header table-sm"
          isTableLoading={isLoading?.table}
          filters={filters}
          setFilters={setFilters}
          removePageSizeDropdown={false}
          setSelectedFlatRows={setSelectedFlatRows}
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

export default Data;
