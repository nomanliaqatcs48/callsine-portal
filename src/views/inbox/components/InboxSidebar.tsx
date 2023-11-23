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
  const [selected, setSelected] = React.useState<string>('');
  const { decrementUnreadCount, unreadEmails } = useUnreadCount();

  const [selectedEmail, setSelectedEmail] = React.useState<number>(-1);

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

  const handleOnClickEmail = (email: string) => {
    setSelected(selected === email ? '' : email);
  };

  const handleSubjectBold = (item: any) => {
    return unreadEmails.some((i: any) => i.id === item.id);
  };

  const handleOnchangeSearchBar = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = event.target.value.toLowerCase();

    // Filter the recipients list based on the search value
    const filteredRecipients = removeEmptyEmails(emailThreads).filter(
      (obj: any) => obj.recipient.toLowerCase().includes(searchValue)
    );

    // Do something with the filtered recipients, e.g., update the UI
    console.log(filteredRecipients);

    setCleanEmailThreads(filteredRecipients);
  };

  return (
    <div className="tw-w-[450px] tw-max-w-[450px]">
        <div className="tw-px-5 tw-border-b tw-border-r tw-border-[#f0f1f3] tw-relative">
          <input
            placeholder="Search"
            type="text"
            className="tw-bg-[#f8fafc] tw-w-full tw-rounded-full tw-py-2 tw-px-6 tw-my-4 focus-visible:tw-border-0 focus-visible:tw-outline-none"
            onChange={handleOnchangeSearchBar}
          />
        </div>
      <Stack
        direction="row"
        className="tw-border-r tw-border-[#f0f1f3] tw-overflow-y-scroll tw-h-[calc(100vh-120px)] tw-overflow-x-hidden"
      >
        <div
          className={`tw-flex-row tw-w-[450px] tw-max-w-[450px] tw-transition-transform tw-duration-300`}
        >
          {cleanEmailThreads?.map((item: any, index: any) => (
            <div
              key={`${item.recipient}-${index}`}
              className="tw-w-full"
            >
              <Email
                item={item}
                index={index}
                handleOnClickEmail={() => handleOnClickEmail(item.recipient)}
                isSelected={item.recipient === selected}
                handleSelectThread={(email: string, index: number) => handleSelectThread(email, index)}
                selectedEmail={selectedEmail}
                handleSubjectBoldFont = {(email: string) => handleSubjectBold(email)}
                
              />
            </div>
          ))}
        </div>
      </Stack>
    </div>
  );
};
