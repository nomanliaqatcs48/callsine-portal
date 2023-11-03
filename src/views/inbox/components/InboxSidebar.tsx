import React, { useEffect } from "react";
import { formatDate, formatDateWithTime, formatTime } from "src/utils/date";
import { Stack, Typography } from "@mui/material";
import { EmailThread } from "src/types/inbox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Email } from "./Email";
import classNames from "classnames";
import { useUnreadCount } from "src/hooks/useUnreadCount";
import {
  gmailThreadReplyService,
  gmailThreadService,
  outLookThreadReplyService,
  outlookThreadService,
  viewToTrueService,
} from "src/services/emails.service";
import { getUnreadReplies } from "src/store/emailReplyCount/actions";
import { store } from "src/store";

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
  const { decrementUnreadCount, unreadEmails } = useUnreadCount();

  const [selectedEmail, setSelectedEmail] = React.useState<number>(-1);

  const [emails, setEmails] = React.useState<any>([]);
  const [cleanEmailThreads, setCleanEmailThreads] = React.useState<any[]>([]);

  useEffect(() => {
    if (emailThreads) {
      setCleanEmailThreads(removeEmptyEmails(emailThreads));
    }
  }, [emailThreads]);

  const handleSelectThread = async (email: any, n: number) => {
    if (email) {
      onSelectThread(email);
      setSelectedEmail(n);
      if (!email.reply_count?.is_viewed) {
        let exists = unreadEmails.some((i: any) => i.id === email.id);
        let res: any;
        if (email.provider === "google") {
          res = await gmailThreadService(email.thread_id, email.from_email);
        } else if (email.provider === "outlook") {
          res = await outlookThreadService(email.thread_id, email.from_email);
        } else {
          return console.error("There is no valid provider given.");
        }

        console.log({ res });
        // if (res?.data) {
        //   setSelectedThread(res.data);
        //   console.log("Response from api", res.data);
        // }

        if (exists) {
          decrementUnreadCount();

          await viewToTrueService(email.reply_count.id);
          await store.dispatch(getUnreadReplies());
        }
      }
    }
  };

  const removeEmptyEmails = (data: any) => {
    const filteredData = data.filter((item: any) => item.emails.length > 0);
    return filteredData;
  };

  console.log("Email thradssss", emailThreads);

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

  const handleSubjectBold = (item: any) => {
    return unreadEmails.some((i: any) => i.id === item.id);
  };

  const handleOnchangeSearchBar = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = event.target.value.toLowerCase();

    // Filter the recipients list based on the search value
    const filteredRecipients = emailThreads.filter((obj) =>
      obj.recipient.toLowerCase().includes(searchValue)
    );

    // Do something with the filtered recipients, e.g., update the UI
    console.log(filteredRecipients);

    setCleanEmailThreads(filteredRecipients);
  };

  return (
    <div className="tw-w-[450px] tw-max-w-[450px]">
      {emails <= 0 && (
        <div className="tw-px-5 tw-border-b tw-border-r tw-border-[#f0f1f3] tw-relative">
          <input
            placeholder="Search"
            type="text"
            className="tw-bg-[#f8fafc] tw-w-full tw-rounded-full tw-py-2 tw-px-6 tw-my-4 focus-visible:tw-border-0 focus-visible:tw-outline-none"
            onChange={handleOnchangeSearchBar}
          />
        </div>
      )}
      <Stack
        direction="row"
        className="tw-border-r tw-border-[#f0f1f3] tw-overflow-y-scroll tw-h-[calc(100vh-120px)] tw-overflow-x-hidden"
      >
        <div
          className={`tw-flex-row tw-w-[450px] tw-max-w-[450px] ${translateX()} tw-transition-transform tw-duration-300`}
        >
          {cleanEmailThreads?.map((item: any, index: any) => (
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
                View all messages
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
                  {/* <Typography className="tw-font-medium tw-text-[16px]"> */}
                  <Typography
                    className={`tw-text-xs ${
                      handleSubjectBold(email)
                        ? "tw-font-medium"
                        : "tw-font-thin"
                    }`}
                  >
                    {email.subject}
                  </Typography>
                  <Typography
                    className={`tw-text-xs tw-w-[80px] ${
                      handleSubjectBold(email)
                        ? "tw-font-medium"
                        : "tw-font-thin"
                    }`}
                  >
                    {formatDate(email.modified_date)}
                  </Typography>
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
