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

const ViewPlaybook = () => {
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
      <Box
        className={`edit-and-delete-container ${_styles?.containers} xl:tw-py-1.5`}
      >
        <Box className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-between">
          {/*left*/}
          <Box className="tw-flex tw-justify-center tw-items-center" />
          {/*right*/}
          <Box className="tw-py-2 tw-flex tw-space-x-2 lg:tw-space-x-[1px]">
            <CreateOrEditPlaybook
              onClick={() => null}
              className="tw-min-w-min border"
            >
              <Box className="tw-bg-[#1a76d2] tw-py-[10px] tw-px-[12px] tw-rounded-md">
                <EditIcon
                  style={{ color: "#ffffff", fontSize: 21 }}
                  fontSize="small"
                  strokeWidth={3}
                />
              </Box>
            </CreateOrEditPlaybook>
            <Button onClick={() => null} className="tw-min-w-min border">
              <Box className="tw-bg-[#d00200] tw-p-[12px] tw-rounded-md">
                <IconTrash
                  strokeWidth={3}
                  size={20}
                  style={{
                    color: "#ffffff",
                  }}
                />
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className={`name-container ${_styles?.containers}`}>
        <Box className="tw-flex">
          <Box className={`${_styles?.label}`}>Prompt Name:</Box>
          <Box className={`${_styles?.labelValue} tw-text-black`}>
            Playbook 1
          </Box>
        </Box>
      </Box>
      <Box className={`message-container ${_styles?.containers}`}>
        <Box className="tw-flex">
          <Box
            className={`${_styles?.message} tw-text-[12px] tw-text-black tw-py-3.5`}
          >
            Write A Short Follow Up Email, From (Forg_Name]| To (First_Name|| At
            (Icompany_Namell. This Should Be No More Than 100 Words, And Should
            Reference That We Are Following Up On An Email Sent Previously.
            Message Should Reference The Case Study At This Link:
            Https://Www.Dbadbadba.Com/Case_Studies/B_Charitable And Direct The
            Recipient To That Link In The Body Of The Message. Say One Thing In
            The Message That Relates To This Case Study:
            Https://Www.Dbadbadba.Com/Case_Studies/_Charitable And That It Might
            Be Interesting To (Company_Namell. Message Should Not Refer To The
            Sender Of This Message By Name In The Body Of The Message. Tone
            Should Be Conversational. Message Should Refer To (Forg_Namell’s
            Experience. Message Should Not Refer To Sender As “We” But Instead
            As *” Message Should Not Repeat Words Like “Experience”
          </Box>
        </Box>
      </Box>
    </>
  );
};

const containers = "tw-px-2 xl:tw-px-10";

export default ViewPlaybook;