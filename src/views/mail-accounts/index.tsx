import React, { useEffect } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";

import { useMailAccounts } from "../../hooks/mail-accounts/useMailAccounts";

import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/mail-accounts/utils";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import DeleteSelectedMailAccounts from "../../ui-component/buttons/DeleteSelectedMailAccount";
import { usePermissions } from "src/hooks/usePermissions";
import CreateMailAccount from "src/ui-component/buttons/CreateMailAccount";
import useHandleCallback from "src/hooks/mail-accounts/useHandleCallback";

const MailAccountsPage = () => {
  const { isNotPremium } = usePermissions();
  const {
    mailAccountsData,
    total,

    filters,
    setFilters,
    isLoading,

    selectedFlatRows,
    setSelectedFlatRows,
    getMailAccounts,
    sortedId,
    setSortedId,
    isOrderDesc,
    setIsOrderDesc,
  } = useMailAccounts();

  useHandleCallback(getMailAccounts);
  useEffect(() => {
    isNotPremium();
  });

  const MyDivider = () => {
    return (
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="tw-hidden lg:tw-block"
        sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
      />
    );
  };

  return (
    <>
      <Box className="tw-mb-10">
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          Mail Accounts
        </Typography>
      </Box>

      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={2} />
          <Grid
            item
            xs={12}
            lg={10}
            className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-x-1 lg:tw-items-center lg:tw-justify-end lg:tw-px-3"
          >
            <CreateMailAccount disableElevation onClick={() => null}>
              <PersonAddAlt1Icon
                color="primary"
                sx={{ fontSize: 15 }}
                className="tw-mr-2"
              />
              Add Mail Account
            </CreateMailAccount>
            {/* <CreateOrEditMailAccount
              disableElevation
              onLoadApi={getMailAccounts}
              onClick={() => null}
            >
              <PersonAddAlt1Icon
                color="primary"
                sx={{ fontSize: 15 }}
                className="tw-mr-2"
              />
              Add Users
            </CreateOrEditMailAccount>

            <MyDivider />

            <ExportMailAccounts /> */}

            <MyDivider />

            <DeleteSelectedMailAccounts
              selectedRows={selectedFlatRows}
              onLoadApi={getMailAccounts}
            />

            <MyDivider />

            <Button
              onClick={() => null}
              disabled={false}
              variant="text"
              className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-callsineLightBlue hover:tw-bg-transparent focus:tw-bg-transparent active:tw-bg-transparent tw-cursor-auto"
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
          setSelectedFlatRows={setSelectedFlatRows}
          isResponsive={true}
          removeSelection={false}
          hiddenColumns={["last_name"]}
          setSortedId={setSortedId}
          setIsOrderDesc={setIsOrderDesc}
          //
          sortedId={sortedId}
          isOrderDesc={isOrderDesc}
        />
      </Paper>
    </>
  );
};

export default MailAccountsPage;
