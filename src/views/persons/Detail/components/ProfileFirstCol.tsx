import React from "react";
import { Avatar, Button, Tooltip, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { ReactComponent as LinkedinIcon } from "../../../../assets/images/svg/linkedin.svg";
import { ReactComponent as FacebookIcon } from "../../../../assets/images/svg/facebook.svg";

type ProfileFirstColTypes = {
  data: any[];
};

const ProfileFirstCol = ({ data }: ProfileFirstColTypes) => {
  return (
    <>
      {/*image, name, email, and icons*/}
      <div className="tw-flex tw-flex-col tw-items-center tw-space-y-3 lg:tw-flex-row lg:tw-justify-start lg:tw-space-x-8">
        <Avatar sx={{ bgcolor: "#bdbdbd", width: 117, height: 117 }}>
          <PersonIcon
            className="tw-opacity-80 tw-w-16 tw-h-16"
            fontSize="large"
            sx={{ color: "#ffffff" }}
          />
        </Avatar>
        <div className="tw-flex tw-flex-col tw-items-center">
          {/*name*/}
          <Typography className="tw-text-2xl tw-font-bold tw-text-black">
            Lilian Moy
          </Typography>
          {/*email*/}
          <Button
            className="tw-font-normal tw-text-[#0096c7] tw-normal-case"
            href="#"
          >
            johndoe@gmail.com
          </Button>
          {/*social icons*/}
          <div className="tw-flex tw-justify-center tw-items-center tw-gap-6 tw-pt-5 tw-pb-3 lg:tw-pt-1">
            <Tooltip title={"Linkedin"}>
              <div
                onClick={() => null}
                className="tw-cursor-pointer tw-p-[0.6rem] tw-w-[32px] tw-bg-[#4465a8] tw-rounded-full tw-scale-110"
              >
                <LinkedinIcon style={{ fill: "white" }} />
              </div>
            </Tooltip>
            <Tooltip title={"Facebook"}>
              <div
                onClick={() => null}
                className="tw-cursor-pointer tw-p-[0.8rem] tw-w-[32px] tw-h-[32px] tw-bg-[#1677f2] tw-rounded-full tw-scale-110"
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
          <Typography className="tw-font-medium tw-text-sm tw-text-black">
            Emails Sent
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-lg tw-text-black">
            0
          </Typography>
        </div>
        <div>
          <Typography className="tw-font-medium tw-text-sm tw-text-black">
            Opened
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-lg tw-text-black">
            0
          </Typography>
        </div>
        <div>
          <Typography className="tw-font-medium tw-text-sm tw-text-black">
            Clicked
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-lg tw-text-black">
            0
          </Typography>
        </div>
        <div>
          <Typography className="tw-font-medium tw-text-sm tw-text-black">
            Replied
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-lg tw-text-black">
            0
          </Typography>
        </div>
        <div>
          <Typography className="tw-font-medium tw-text-sm tw-text-black">
            Pageviews
          </Typography>
          <Typography className="tw-flex tw-flex-row tw-justify-center tw-font-semibold tw-text-lg tw-text-black">
            0
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ProfileFirstCol;
