import { Button, Divider, Tooltip } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import { IconTrash } from "@tabler/icons-react";

type DraftEmailTypes = {
  playBookData: any;
  selectedData: any;
};

const DraftEmail = ({ playBookData, selectedData }: DraftEmailTypes) => {
  const SendContainer = () => {
    return (
      <div className={`send-container ${containers} xl:tw-py-5`}>
        <div className="tw-flex tw-flex-col tw-items-center sm:tw-flex-row sm:tw-justify-between">
          {/*left*/}
          <div className="tw-flex tw-justify-center tw-items-center">
            <Button
              type="button"
              variant="outlined"
              onClick={() => null}
              className="tw-border tw-border-[#569ade] tw-flex tw-justify-around tw-items-center tw-py-2 sm:tw-py-3 lg:tw-px-5"
            >
              <span className="tw-px-1.5 tw-text-xs tw-uppercase tw-font-medium">
                Send
              </span>{" "}
              <SendOutlinedIcon sx={{ fontSize: 20, color: "#3586d7" }} />
            </Button>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-mx-4"
            />
            <Button className="tw-py-2 tw-px-0 sm:tw-py-3 sm:tw-px-1 sm:tw-min-w-min">
              <ScheduleSendOutlinedIcon
                sx={{ fontSize: 24, color: "#778da9" }}
              />
              <span className="tw-text-[#778da9] tw-text-xs tw-px-2">
                Send Later
              </span>
            </Button>
          </div>
          {/*right*/}
          <div>
            <Button onClick={() => null} className="tw-min-w-min">
              <IconTrash
                strokeWidth={3}
                size={18}
                style={{ color: "#778da9" }}
              />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const FromContainer = () => {
    return (
      <div className={`from-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>From</div>
          <div className={`${labelValue}`}>
            <input
              type="text"
              value="callsine@gmail.comasdasdasdadasdasdasda"
              className={`${labelValueInput}`}
            />
          </div>
        </div>
      </div>
    );
  };

  const ToContainer = () => {
    return (
      <div className={`to-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>To</div>
          <div className={`${labelValue}`}>
            <input
              type="text"
              defaultValue={playBookData?.work_email}
              className={`${labelValueInput}`}
            />
          </div>
        </div>
      </div>
    );
  };

  const SubjectContainer = () => {
    return (
      <div className={`subject-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>Subject</div>
          <div className={`${labelValue}`}>
            <input type="text" className={`${labelValueInput}`} />
          </div>
        </div>
      </div>
    );
  };

  const MessageContainer = () => {
    return (
      <div className={`message-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>Message</div>
          <div className={`${labelValue}`}>This is temporary</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SendContainer />
      <FromContainer />
      <ToContainer />
      <SubjectContainer />
      <MessageContainer />
    </>
  );
};

const containers =
  "tw-px-2 tw-py-2 tw-border-b tw-border-[#f2f3f9] xl:tw-px-10 xl:tw-py-3";
const label =
  "tw-w-4/12 tw-font-light tw-text-[#889bb3] lg:tw-w-3/12 xl:tw-w-2/12 2xl:tw-w-1/12";
const labelValue =
  "tw-w-8/12 tw-font-normal tw-text-[#889bb3] tw-truncate lg:tw-w-9/12 xl:tw-w-10/12 2xl:tw-w-11/12 2xl:tw-pl-4";
const labelValueInput =
  "tw-w-full tw-outline-none tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]";

export default DraftEmail;
