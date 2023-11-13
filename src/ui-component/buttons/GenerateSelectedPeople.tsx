import { ErrorMessage } from "@hookform/error-message";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getTeamPlaybooks } from "src/services/playbooks.service";
import { useAuth } from "../../contexts/auth";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess, ToastWarning } from "../../helpers/toast";
import { bulkGenerateService } from "../../services/prompts.service";
import ReactSelect from "../dropdowns/ReactSelect";

type GenerateSelectedPeopleProps = {
  selectedRows: any[];
  // onLoadApi: any;
  // onLoadCount: any;
  executeRefreshTable: any;
};

const GenerateSelectedPeople = ({
  selectedRows,
  // onLoadApi,
  // onLoadCount,
  executeRefreshTable,
}: GenerateSelectedPeopleProps) => {
  const { auth, updateProfile } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
    onPage: true,
  });
  const [prompts, setPrompts] = useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filters, setFilters] = React.useState<any>({
    limit: 9999,
    offset: 0,
    currentPage: 1,
  });
  const [playbookId, setPlaybookId] = useState<any>(null);
  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    reset,
    getValues,
    trigger,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open) {
      getPrompts();
      register("playbook_id", {
        required: "This is required field.",
      });
    }
  }, [open]);

  const getPrompts = async () => {
    try {
      let res = await getTeamPlaybooks(auth["team"], filters, searchValue);
      if (res?.data) {
        setPrompts(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.error("e", e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const handleOpen = () => {
    if (!selectedRows?.length) {
      ToastWarning("Please select person");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPlaybookId(null);
    reset();
  };

  const handleGenerateOnChange = (newValue: any) => {
    setPlaybookId(newValue);
    setValue("playbook_id", newValue);
    trigger("playbook_id");
  };

  const onGenerate = async (data: any) => {
    devLog(() => {
      console.log("selectedRows", selectedRows);
    });
    if (!selectedRows?.length) {
      ToastWarning("Please select person");
      return;
    }
    if (selectedRows.length > 0) {
      var ids = selectedRows.map((item: any, idx) => {
        return item.id;
      });
      devLog(() => {
        console.log("ids", ids);
      });
      try {
        let res = await bulkGenerateService(ids, Number(playbookId?.value));
        if (res?.status === 201) {
          handleClose();
          ToastSuccess("Email generation successfully started.");
          executeRefreshTable();
          // onLoadApi();
          // onLoadCount();
        }
        if (res?.status === 500) {
          ToastError("Something went wrong");
        }
      } catch (e: any) {
        devLogError(() => {
          console.error("error", e?.response);
        });
        ToastError("Something went wrong");
      }

      // selectedRows.map(async (item: any, idx) => {
      //   try {
      //     console.log(item?.id);
      //     let res = await deletePersonDetailService(item?.id);
      //     // if (res?.status === 204) {}
      //     // if (idx === selectedRows?.length - 1) {
      //     //   ToastSuccess("Email generation successfully started.");
      //     //   onLoadApi();
      //     // }
      //   } catch (e: any) {
      //     ToastError("Something went wrong!");
      //     console.error(e?.response);
      //   }
      // });
    }
  };

  return (
    <>
      <Tooltip title="Generate emails for selected people">
        <Button
          onClick={handleOpen}
          disabled={false}
          className="tw-text-[#778da9] tw-text-[16px] tw-tracking-[0.32px] tw-font-normal"
          style={{ color: selectedRows.length > 0 ? "#1976d2" : "#778da9" }}
        >
          <AutoModeIcon
            sx={{
              color: selectedRows.length > 0 ? "#1a76d2" : "#778da9",
              fontSize: 15,
            }}
            className="tw-mr-2"
          />
          Generate Selected
        </Button>
      </Tooltip>

      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ width: { xs: 400 }, marginX: "auto" }}
          scroll="body"
          fullWidth={true}
          maxWidth="xl"
          aria-labelledby="Generate selected people"
          aria-describedby="Generate selected people"
          disableEnforceFocus={true}
        >
          <DialogContent className="tw-pt-6">
            <ReactSelect
              name="select-playbook"
              className="basic-single tw-cursor-pointer"
              variant="blue"
              placeholder="Select Playbook"
              isClearable={true}
              isSearchable={true}
              options={prompts.map((item: any, idx: number) => {
                item.value = item?.id;
                item.label = item?.name || "";

                return item;
              })}
              styles={selectBlueStyles}
              onChange={(newValue: any, actionMeta: any) => {
                devLog(() => {
                  // console.group("Value Changed");
                  // console.log(newValue);
                  // console.log(`action: ${actionMeta.action}`);
                  // console.groupEnd("===========");
                });
                handleGenerateOnChange(newValue);
              }}
            />
            <ErrorMessage
              errors={errors}
              name="playbook_id"
              render={({ message }) => (
                <FormHelperText sx={{ color: "error.main" }}>
                  {message}
                </FormHelperText>
              )}
            />
          </DialogContent>
          <DialogActions className="tw-pb-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit((data) => onGenerate(data))}
              disabled={isLoading?.submit}
              className="tw-bg-primary hover:tw-bg-primaryDark tw-normal-case"
            >
              Yes, please!
            </Button>
            <Button onClick={handleClose} disabled={isLoading?.submit}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const selectBlueStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "#1a76d2",
    boxShadow: "none",
    border: "1px solid #1a76d2",
    cursor: "pointer",
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#1a76d2"
        : isFocused
        ? "white"
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? "white"
        : isFocused
        ? "#0253ad"
        : "#3486d7",
      cursor: isDisabled ? "not-allowed" : "pointer",
      padding: "8px 18px",
      fontWeight: 400,
      fontSize: "0.83rem",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? data.color : undefined,
      },
    };
  },
  menu: (styles: any, { isLoading, placement, children }: any) => ({
    ...styles,
    border: "1px solid #74ace4",
    boxShadow: "none",
    borderRadius: 7,
    background: "#f8fbff",
    zIndex: 9,
    position: "relative",
  }),
  menuList: (styles: any) => ({
    ...styles,
    paddingTop: 10,
    paddingBottom: 10,
  }),
  input: (styles: any) => ({ ...styles, color: "white" }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "white",
    fontSize: "0.7rem",
    fontWeight: 600,
  }),
  singleValue: (styles: any, { data }: any) => ({
    ...styles,
    color: "white",
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    color: "white",
    "&:hover": {
      color: "white",
    },
  }),
  indicatorSeparator: (
    styles: any,
    { isDisabled, isFocused, innerProps }: any
  ) => ({ ...styles, display: "none" }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: "white",
    ":hover": {
      color: "white",
    },
    svg: {
      width: 16,
    },
  }),
};

export default GenerateSelectedPeople;
