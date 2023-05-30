import { Button, Divider } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import { IconTrash } from "@tabler/icons-react";
import { ReactComponent as UserIcon } from "../../../../../../assets/images/svg/user.svg";
import React from "react";

const Email = () => {
  const NameAndEmail = () => {
    return (
      <div
        className={`name-email-container tw-py-2 tw-border-b tw-border-[#f2f3f9] ${containers} xl:tw-py-5`}
      >
        <div className="tw-flex tw-flex-col tw-items-center sm:tw-flex-row sm:tw-justify-between">
          {/*left*/}
          <div className="tw-flex tw-justify-center tw-items-center">
            <div className="tw-flex tw-items-center tw-justify-start tw-gap-2 tw-text-inherit tw-text-[0.75rem] tw-leading-4 tw-no-underline hover:tw-bg-transparent text">
              <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                <UserIcon className="tw-absolute tw-w-7 tw-h-7 tw-text-gray-400" />
              </div>
              <div className="tw-pl-1.5">
                <div className="tw-text-black tw-text-[0.9rem] tw-font-medium">
                  Andrew Julian
                </div>
                <div className="tw-text-xs tw-text-[#99a9be] tw-font-medium">
                  andrewjulian@gmail.com
                </div>
              </div>
            </div>
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

  const EmailDate = () => {
    return (
      <div className={`date-container ${containers} tw-pt-6`}>
        <span className="tw-text-xs tw-text-[#99a9be] tw-tracking-[-0.5px]">
          May 3, 2023, 10:21 PM
        </span>
      </div>
    );
  };

  const Subject = () => {
    return (
      <div className={`subject-container ${containers}`}>
        <h3 className="tw-text-black tw-text-lg tw-font-semibold tw-pb-5 xl:tw-text-[1.4rem]">
          Campaigns
        </h3>
      </div>
    );
  };

  const Message = () => {
    return <div className={`message-container ${containers}`}>Message</div>;
  };

  return (
    <>
      <NameAndEmail />
      <EmailDate />
      <Subject />
      <Message />
    </>
  );
};

const containers = "tw-px-2 xl:tw-px-10";

export default Email;
