import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import DeletePrompt from "src/ui-component/buttons/DeletePrompt";
import { _styles } from "../../../utils/playbooks/utils";
import CreateOrEditPrompt from "../../buttons/CreateOrEditPrompt";

type ViewPlaybookTypes = {
  prompts: any;
  onLoadApi: any;
  setPromptList?: any;
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
        <Box key={idx} className="tw-border-b tw-border-[#f2f3f9] tw-mb-6">
          <Box
            className={`edit-and-delete-container ${_styles?.containers} tw-border-none xl:tw-py-1.5`}
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
                  onLoadApi={() => null}
                  setPromptList={setPromptList}
                >
                  <Box className="tw-bg-[#1976d2] tw-px-[17px] tw-py-[15.5px] tw-rounded-md">
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
                  <Box className="tw-bg-[#D00000] tw-p-[17.5px] tw-rounded-md">
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
          <Box
            className={`name-container ${_styles?.containers} tw-border-none`}
          >
            <Box className="tw-flex">
              <Box className={`${_styles?.label} tw-tracking-[0.36px]`}>
                Position:&nbsp;
              </Box>
              <Box
                className={`${_styles?.labelValue} tw-text-black tw-tracking-[0.36px]`}
              >
                {idx + 1}
              </Box>
            </Box>
          </Box>
          <Box
            className={`message-container ${_styles?.containers} tw-border-none`}
          >
            <Box className="tw-flex">
              <Box
                className={`${_styles?.message} tw-text-[16px] tw-text-black tw-py-3.5 tw-tracking-[0.32px]`}
              >
                {prompt?.text}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

const containers = "tw-px-2 xl:tw-px-10";

export default ViewPrompt;
