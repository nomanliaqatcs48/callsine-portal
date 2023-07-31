import { Box, Button, Divider, FormHelperText } from "@mui/material";
import { _styles } from "../../../utils/playbooks/utils";
import { LoadingButton } from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendLater from "../../buttons/SendLater";
import React from "react";
import { IconTrash } from "@tabler/icons-react";
import EditIcon from "@mui/icons-material/Edit";
import ReactSelect from "../../dropdowns/ReactSelect";
import { selectBlueStyles } from "../../../utils/people/utils";
import { ErrorMessage } from "@hookform/error-message";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useForm } from "react-hook-form";
import CreateOrEditPlaybook from "../../buttons/CreateOrEditPlaybook";
import CreateOrEditPrompt from "../../buttons/CreateOrEditPrompt";
import DeletePlaybook from "../../buttons/DeletePlaybook";
import DeletePrompt from "src/ui-component/buttons/DeletePrompt";

type ViewPlaybookTypes = {
  prompts: any;
  onLoadApi: any;
  setPromptList: any;
  setPlaybookData: any;
};

type PromptTypes = {
  id: number;
  name: string;
  text: string;
  order: number;
};

const ViewPrompt = ({
  prompts,
  onLoadApi,
  setPromptList,
  setPlaybookData,
}: ViewPlaybookTypes) => {
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
  } = useForm({ mode: "onChange" });
  return (
    <>
      {prompts.map((prompt: PromptTypes, idx: number) => (
        <div key={idx}>
          <Box
            className={`edit-and-delete-container ${_styles?.containers} xl:tw-py-1.5`}
          >
            <Box className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-between">
              {/*left*/}
              <Box className="tw-flex tw-justify-center tw-items-center" />
              {/*right*/}
              <Box className="tw-py-2 tw-flex tw-space-x-2 lg:tw-space-x-[1px]">
                <CreateOrEditPrompt
                  onClick={() => null}
                  className="border tw-min-w-min"
                  id={prompt?.id}
                  defaultValue={prompt?.text}
                  setPromptList={setPromptList}
                  onLoadApi={() => null}
                >
                  <Box className="tw-bg-[#1a76d2] tw-px-[15.5px] tw-py-[17px] tw-rounded-md">
                    <EditIcon
                      style={{ color: "#ffffff", fontSize: 21 }}
                      fontSize="small"
                      strokeWidth={3}
                    />
                  </Box>
                </CreateOrEditPrompt>
                <DeletePrompt
                  id={prompt?.id}
                  className="border tw-min-w-min"
                  onLoadApi={() => null}
                  setPromptList={setPromptList}
                >
                  <Box className="tw-bg-[#d00200] tw-p-[17.5px] tw-rounded-md">
                    <IconTrash
                      strokeWidth={3}
                      size={20}
                      style={{
                        color: "#ffffff",
                      }}
                    />
                  </Box>
                </DeletePrompt>
              </Box>
            </Box>
          </Box>
          <Box className={`name-container ${_styles?.containers} xl:tw-py-7`}>
            <Box className="tw-flex">
              <Box className={`${_styles?.label}`}>Order:</Box>
              <Box className={`${_styles?.labelValue} tw-text-black`}>
                {prompt?.order}
              </Box>
            </Box>
          </Box>
          <Box
            className={`message-container ${_styles?.containers} tw-border-none`}
          >
            <Box className="tw-flex">
              <Box
                className={`${_styles?.message} tw-text-[16px] tw-text-black tw-py-3.5`}
              >
                {prompt?.text}
              </Box>
            </Box>
          </Box>
        </div>
      ))}
    </>
  );
};

const containers = "tw-px-2 xl:tw-px-10";

export default ViewPrompt;
