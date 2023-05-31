import { Button, Divider, Tooltip } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import { IconTrash } from "@tabler/icons-react";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import MyEditor from "../../../../../../ui-component/editor/MyEditor";
import React from "react";

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
            <ReactSelect
              name="from"
              className="basic-single tw-cursor-pointer"
              variant="blue"
              placeholder="Please select"
              isClearable={true}
              isSearchable={true}
              options={[
                { label: "Playbook 1", value: 1 },
                { label: "Playbook 2", value: 2 },
              ]}
              styles={selectBlueStyles}
            />
            {/*<input
              type="text"
              value="callsine@gmail.comasdasdasdadasdasdasda"
              className={`${labelValueInput}`}
            />*/}
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
      <div className={`message-container tw-p-0 xl:tw-p-0`}>
        <div className="">
          <MyEditor
            initialValue={""}
            onEditorChange={(value: string, editor: any) => {
              // handleMyEditorOnChange(value, editor);
            }}
            // isPreformatted={true}
            onFocus={(e: any) => null}
          />
          {/*<div className={`${label}`}>Message</div>
          <div className={`${labelValue}`}>This is temporary</div>*/}
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

const selectBlueStyles = {
  control: (styles: any) => ({
    ...styles,
    display: "flex",
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid transparent", //"1px solid #1a76d2",
    cursor: "pointer",
    justifyContent: "start",
    alignItems: "start",
    minHeight: 0,
    borderRadius: 0,
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "500ms",
    "&:hover": {
      borderColor: "transparent",
    },
    "&.select__control--menu-is-open": {
      borderBottom: "1px solid #1a76d2",
    },
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
  input: (styles: any) => ({ ...styles, color: "#889bb3" }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#889bb3",
    fontSize: "0.875rem",
    fontWeight: 400,
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: 0,
    display: "flex",
  }),
  singleValue: (styles: any, { data }: any) => ({
    ...styles,
    color: "#889bb3",
  }),
  clearIndicator: (styles: any) => ({ ...styles, padding: 0 }),
  indicatorSeparator: (
    styles: any,
    { isDisabled, isFocused, innerProps }: any
  ) => ({ ...styles, display: "none" }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    display: "none",
    color: "#889bb3",
    ":hover": {
      color: "#889bb3",
    },
    svg: {
      width: 16,
    },
  }),
};

const containers =
  "tw-px-2 tw-py-2 tw-border-b tw-border-[#f2f3f9] xl:tw-px-10 xl:tw-py-3";
const label =
  "tw-w-4/12 tw-font-light tw-text-[#889bb3] lg:tw-w-3/12 xl:tw-w-2/12 2xl:tw-w-1/12 tw-flex tw-items-center";
const labelValue =
  "tw-w-8/12 tw-font-normal tw-text-[#889bb3] tw-truncate lg:tw-w-9/12 xl:tw-w-10/12 2xl:tw-w-11/12 2xl:tw-pl-4";
const labelValueInput =
  "tw-w-full tw-outline-none tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]";

export default DraftEmail;
