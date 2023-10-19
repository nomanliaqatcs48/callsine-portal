import { Avatar, Button, Tooltip, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { ReactComponent as LinkedinIcon } from "../../../../assets/images/svg/linkedin.svg";
import { ReactComponent as FacebookIcon } from "../../../../assets/images/svg/facebook.svg";
import { usePersonStats } from "../../../../hooks/persons/usePersonStats";
import EditableName from "./EditableName";

type ProfileFirstColTypes = {
  data: any;
  editMode: boolean;
};

const ProfileFirstCol = ({ data, editMode }: ProfileFirstColTypes) => {
  let { personStatData } = usePersonStats();
  console.log("DATAA", data);

  return (
    <>
      {/*image, name, email, and icons*/}
      <div className="tw-flex tw-flex-col tw-items-center tw-space-y-3 lg:tw-flex-row lg:tw-justify-start lg:tw-space-x-9">
        <Avatar sx={{ bgcolor: "#bdbdbd", width: 150, height: 150 }}>
          <PersonIcon
            className="tw-opacity-80 tw-w-16 tw-h-16"
            fontSize="large"
            sx={{ color: "#ffffff" }}
          />
        </Avatar>
        <div className="tw-flex tw-flex-col tw-items-start">
          {/*name*/}
          <Typography className="tw-text-[25px] tw-font-semibold tw-text-black tw-tracking-[0.5px]">
            {editMode ? (
              <EditableName data={data} editMode={editMode} />
            ) : (
              `${data?.first_name || ""} ${data?.last_name || ""}`
            )}
          </Typography>
          {/*email*/}
          {data?.work_email && (
            <Button
              className="tw-font-normal tw-text-[16px]  tw-tracking-[0.32px] tw-text-callsineLightBlue tw-normal-case tw-pl-0 hover:tw-bg-transparent"
              href={`mailto:${data?.work_email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.work_email || ""}
            </Button>
          )}
          {/*social icons*/}
          <div className="tw-flex tw-justify-center tw-items-center tw-gap-6 tw-pt-5 tw-pb-3 lg:tw-pt-1">
            <Tooltip title={data?.linkedin ? "Linkedin" : "No linkedin yet"}>
              <div
                onClick={() => {
                  data?.linkedin && window.open(data.linkedin, "_blank");
                }}
                className={`tw-p-[0.8rem] tw-w-[40px] tw-h-[40px] tw-bg-[#4465A8] tw-rounded-full tw-scale-110 ${
                  data?.linkedin ? "tw-cursor-pointer" : "tw-cursor-not-allowed"
                }`}
              >
                <LinkedinIcon style={{ fill: "white" }} />
              </div>
            </Tooltip>
            <Tooltip title={data?.facebook ? "Facebook" : "No facebook yet"}>
              <div
                onClick={() => {
                  data?.facebook && window.open(data.facebook, "_blank");
                }}
                className={`tw-p-[1rem] tw-w-[40px] tw-h-[40px] tw-bg-[#1677f2] tw-rounded-full tw-scale-110 ${
                  data?.facebook ? "tw-cursor-pointer" : "tw-cursor-not-allowed"
                }`}
              >
                <FacebookIcon
                  className="-tw-mt-0.5"
                  style={{ fill: "white" }}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      {/*emails sent, opened, clicked*/}
      <div className="tw-flex tw-flex-col tw-items-center tw-mt-8 sm:tw-flex-row sm:tw-justify-between">
        <div>
          <Typography className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-leading-[25px] tw-text-black">
            Emails Sent
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-[20px] tw-tracking-[0.4px] tw-text-black">
            {data?.total_email_sent || "0"}
          </Typography>
        </div>
        <div>
          <Typography className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-leading-[25px] tw-text-black">
            Opened
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-[20px] tw-tracking-[0.4px] tw-text-black">
            {data?.total_opened || "0"}
          </Typography>
        </div>
        <div>
          <Typography className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-leading-[25px] tw-text-black">
            Clicked
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-[20px] tw-tracking-[0.4px] tw-text-black">
            {data?.total_click_count || "0"}
          </Typography>
        </div>
        <div>
          <Typography className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-leading-[25px] tw-text-black">
            Replied
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-[20px] tw-tracking-[0.4px] tw-text-black">
            {data?.total_reply || "0"}
          </Typography>
        </div>
        {/*<div>
          <Typography className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-leading-[25px] tw-text-black">
            Pageviews
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-[20px] tw-tracking-[0.4px] tw-text-black">
            {personStatData?.pageviews || "0"}
          </Typography>
        </div>*/}
      </div>
    </>
  );
};

export default ProfileFirstCol;
