import * as React from "react";
import { Box, Button, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { IconPlug } from "@tabler/icons-react";
import { useUserData } from "../../hooks/user-data/useUserData";
import AddUserData from "../../ui-component/buttons/AddUserData";
import DeleteSelectedUserData from "../../ui-component/buttons/DeleteSelectedUserData";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "../../utils/user-data/utils";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";

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
      <Box className="tw-mb-10">
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          Data
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal">
                  Data is where you see all the data you’ve uploaded to the
                  system and can be used to create personalized emails with
                  attachments.
                </Typography>
              </React.Fragment>
            }
          >
            <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
          </HtmlTooltip>
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
            <Tooltip title="Coming soon!">
              <div>
                <Button
                  disabled={true}
                  className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-primary"
                >
                  <IconPlug
                    // sx={{ color: "#1a76d2", fontSize: 15 }}
                    className="tw-mr-2"
                  />
                  Connect Data
                </Button>
              </div>
            </Tooltip>
            <MyDivider />
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
              className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-callsineLightBlue hover:tw-bg-transparent focus:tw-bg-transparent active:tw-bg-transparent tw-cursor-auto"
            >
              {total || 0} Data
            </Button>
          </Grid>
        </Grid>
        <MyTable
          columns={_columns(getUsers)}
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
