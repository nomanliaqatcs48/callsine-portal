import React from "react";
import { formatTime } from "src/utils/date";
import { Stack, Typography } from "@mui/material";
import { EmailThread } from "src/types/inbox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Email } from "./Email";

interface InboxSidebarProps {
  emailThreads: EmailThread[];
  onSelectThread: any;
  onReset: any;
}

export const InboxSidebar: React.FC<InboxSidebarProps> = ({
  emailThreads,
  onSelectThread,
  onReset,
}) => {
  const [selected, setSelected] = React.useState<number>(-1);

  const [selectedEmail, setSelectedEmail] = React.useState<number>(-1);

  const [emails, setEmails] = React.useState<any>([]);

  const handleSelectThread = (email: any, n: number) => {
    if (email) {
      onSelectThread(email);
      setSelectedEmail(n);
    }
  };

  const handleOnClickEmail = (emails: any, emailIndex: number) => {
    setSelected(selected === emailIndex ? -1 : emailIndex);
    if (emailIndex === selected) {
      setEmails([]);
    } else {
      setEmails(emails);
    }
  };

  const reset = () => {
    setEmails([]);
    setSelected(-1);
    setSelectedEmail(-1);
    onReset();
  };

  const handleOnPressBack = () => {
    reset();
  };

  const translateX = () => {
    return selected > -1 ? "-tw-translate-x-full" : "tw-translate-x-0";
  };

  return (
    <div className="tw-w-[450px] tw-max-w-[450px]">
      <div className="tw-px-5 tw-border-b tw-border-r tw-border-[#f0f1f3] tw-relative tw-h-[100px]">
        <input
          placeholder="Search"
          type="text"
          className="tw-bg-[#f8fafc] tw-w-full tw-rounded-full tw-py-2 tw-px-6 tw-my-4 focus-visible:tw-border-0 focus-visible:tw-outline-none"
        />
      </div>
      <Stack
        direction="row"
        className="tw-border-r tw-border-[#f0f1f3] tw-overflow-y-scroll tw-h-[calc(100vh-120px)] tw-overflow-x-hidden"
      >
        <div
          className={`tw-flex-row tw-w-[450px] tw-max-w-[450px] ${translateX()} tw-transition-transform tw-duration-300`}
        >
          {emailThreads.map((item, index) => (
            <div
              key={`${item.recipient}-${index}`}
              className="tw-w-full"
              onClick={() => handleOnClickEmail(item.emails, index)}
            >
              <Email
                item={item}
                index={index}
                isSelected={index === selected}
              />
            </div>
          ))}
        </div>

        <div
          className={`tw-flex-row tw-min-w-[450px] tw-max-w-[450px] ${translateX()} tw-transition-transform tw-duration-300`}
        >
          {emails && emails.length > 0 && (
            <div
              className="tw-bg-[#3dabd9] tw-flex tw-flex-row tw-py-5 tw-px-5 tw-items-center tw-border-b tw-border-[#f0f1f3] tw-text-white hover:tw-bg-[#3dabd9af] tw-transition-colors tw-duration-300 tw-cursor-pointer"
              onClick={handleOnPressBack}
            >
              <ArrowBackIosIcon />
              <Typography className="tw-text-[18px]">
                Back to Contacts
              </Typography>
            </div>
          )}
          {emails &&
            emails.map((email: any, index: number) => (
              <Stack
                py={2}
                px={3}
                key={`${email.subject}-${index}`}
                onClick={() => handleSelectThread(email, index)}
                className={`tw-w-full tw-border-b tw-border-[#f0f1f3] tw-cursor-pointer hover:tw-bg-gray-100 tw-transition-colors tw-duration-300 ${
                  selectedEmail === index &&
                  `tw-border-l-[10px] tw-border-l-primary`
                }`}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography className="tw-font-medium tw-text-[16px]">
                    {email.subject}
                  </Typography>
                  <Typography>{formatTime(email.created_date)}</Typography>
                </Stack>
                <br />
                {/*  */}
              </Stack>
            ))}
        </div>
      </Stack>
    </div>
  );
};
