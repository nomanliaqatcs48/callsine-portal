import AutoModeIcon from "@mui/icons-material/AutoMode";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess, ToastWarning } from "../../helpers/toast";
import { bulkGenerateService } from "../../services/prompts.service";
import React, { useState } from "react";
import MyModal from "../modal/MyModal";
import ReactSelect from "../dropdowns/ReactSelect";
import { useForm } from "react-hook-form";

type GenerateSelectedPeopleProps = {
  selectedRows: any[];
  onLoadApi: any;
};

const GenerateSelectedPeople = ({
  selectedRows,
  onLoadApi,
}: GenerateSelectedPeopleProps) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    submit: false,
  });
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

  const handleOpen = () => {
    if (!selectedRows?.length) {
      ToastWarning("Please select person");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onGenerate = async () => {
    devLog("selectedRows", selectedRows);
    if (!selectedRows?.length) {
      ToastWarning("Please select person");
      return;
    }
    if (selectedRows.length > 0) {
      var ids = selectedRows.map((item: any, idx) => {
        return item.id;
      });
      devLog("ids", ids);
      let res = await bulkGenerateService(ids);
      if (res?.status === 201) {
        ToastSuccess("Email generation successfully started.");
        onLoadApi();
      }
      if (res?.status === 500) {
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
      //   } catch ({ response }) {
      //     ToastError("Something went wrong!");
      //     devLogError(response);
      //   }
      // });
    }
  };

  return (
    <>
      <Tooltip title="Generate emails for selected people">
        <Button
          onClick={onGenerate}
          disabled={false}
          className="tw-text-[#778da9]"
          style={{ color: selectedRows.length > 0 ? "#1a76d2" : "#778da9" }}
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

      {/*{open && (
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
              name="generate-playbook"
              className="basic-single tw-cursor-pointer"
              variant="blue"
              placeholder="GENERATE PLAYBOOK"
              isClearable={true}
              isSearchable={true}
            />
          </DialogContent>
          <DialogActions className="tw-pb-6">
            <Button
              variant="contained"
              color="primary"
              onClick={onGenerate}
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
      )}*/}
    </>
  );
};

export default GenerateSelectedPeople;
