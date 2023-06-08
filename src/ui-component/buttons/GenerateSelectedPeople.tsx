import AutoModeIcon from "@mui/icons-material/AutoMode";
import { Button, Tooltip } from "@mui/material";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { bulkGenerateService } from "../../services/prompts.service";

type GenerateSelectedPeopleProps = {
  selectedRows: any[];
  onLoadApi: any;
};

const GenerateSelectedPeople = ({
  selectedRows,
  onLoadApi,
}: GenerateSelectedPeopleProps) => {
  const onGenerate = async () => {
    devLog("selectedRows", selectedRows);
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
    </>
  );
};

export default GenerateSelectedPeople;
