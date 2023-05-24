import React, { useEffect } from "react";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import MyTable from "../../ui-component/tables/MyTable";
import { _columns } from "./utils/utils";
import { usePersons } from "./hooks/usePersons";
import TotalListSmallCard from "../../ui-component/cards/TotalListSmallCard";
import SearchFieldV2 from "../../ui-component/forms/SearchFieldV2";
import Filter from "../../ui-component/dropdowns/Filter";
import CreateOrEditPerson from "../../ui-component/buttons/CreateOrEditPerson";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/auth";
import ImportPeople from "../../ui-component/buttons/ImportPeople";
import { ToastSuccess } from "../../helpers/toast";
import ExportPeople from "../../ui-component/buttons/ExportPeople";
import { devLog } from "../../helpers/logs";
import DeleteSelectedPeople from "../../ui-component/buttons/DeleteSelectedPeople";

const PersonsPage = () => {
  const auth: any = useAuth();
  const {
    personsData,
    setPersonsData,
    total,
    setTotal,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    selectedPersonRows,
    setSelectedPersonRows,
    getPeople,
  } = usePersons();

  const successfulUploadCsv = () => {
    getPeople();
    ToastSuccess("File successfully uploaded.");
  };

  return (
    <>
      <Typography className="tw-text-4xl">People</Typography>
      <Grid className="tw-my-5" />
      <Grid
        container
        spacing={0}
        className="tw-space-y-5 lg:tw-space-y-0 lg:tw-space-x-3 xl:tw-space-x-0"
      >
        {/*search and filter*/}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={7}
          xl={9}
          className="tw-bg-white tw-p-3 tw-border tw-border-[#eff0f1] tw-rounded-lg sm:tw-px-32 xl:tw-flex xl:tw-px-3 xl:tw-items-center"
        >
          <Grid
            container
            className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4"
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
              <SearchFieldV2 />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Filter
                id="title-filter"
                showLabel={true}
                labelText="Title"
                data={[{ label: "All", value: "" }]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Filter
                id="company-filter"
                showLabel={true}
                labelText="Company"
                data={[{ label: "All", value: "" }]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
              <Filter
                id="industry-filter"
                showLabel={true}
                labelText="Industry"
                data={[{ label: "All", value: "" }]}
              />
            </Grid>
          </Grid>
        </Grid>
        {/*card*/}
        <Grid
          item
          className="tw-flex tw-flex-col tw-justify-center tw-px-20 lg:tw-px-1 xl:tw-pl-5"
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={3}
        >
          <TotalListSmallCard
            isLoading={isLoading?.onPage}
            value={auth?.clicks_remaining || 0}
            text="Remaining People"
          />
        </Grid>
      </Grid>
      <div style={{ height: 20 }} />
      <Paper elevation={2} className="tw-pt-4">
        <Grid container>
          <Grid item xs={12} lg={2}>
            <Typography className="tw-text-lg tw-font-medium tw-pl-3">
              User Details
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={10}
            className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-x-1 lg:tw-items-center lg:tw-justify-end lg:tw-px-3"
          >
            <CreateOrEditPerson
              btnText={
                <>
                  <PersonAddAlt1Icon
                    color="primary"
                    sx={{ fontSize: 15 }}
                    className="tw-mr-2"
                  />
                  Add Person
                </>
              }
              onSubmit={getPeople}
              onClick={() => null}
            />

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-hidden lg:tw-block"
              sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
            />

            <ImportPeople onLoadApi={successfulUploadCsv} />

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-hidden lg:tw-block"
              sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
            />

            <ExportPeople data={personsData} />

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-hidden lg:tw-block"
              sx={{ borderColor: "#bbc6d4", borderRightWidth: 2 }}
            />

            <DeleteSelectedPeople
              selectedRows={selectedPersonRows}
              onLoadApi={getPeople}
            />

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
              {total || 0} {total === 0 || total === 1 ? "Person" : "People"}{" "}
              Total
            </Button>
          </Grid>
        </Grid>
        <MyTable
          columns={_columns()}
          data={personsData}
          totalItems={total || 0}
          tableName="PersonsTable"
          tableClassName="table-persons gray-header table-sm"
          isTableLoading={isLoading?.table}
          filters={filters}
          setFilters={setFilters}
          removePageSizeDropdown={false}
          setSelectedFlatRows={setSelectedPersonRows}
          isResponsive={true}
          removeSelection={false}
          hiddenColumns={["last_name"]}
          // topContent={renderSearch}
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

export default PersonsPage;
