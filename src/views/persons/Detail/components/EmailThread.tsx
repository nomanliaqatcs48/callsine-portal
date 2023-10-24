import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import { cleanBody, EmailContainer } from "src/utils/people/emailThread";

import { useEmailThread } from "src/hooks/persons/useEmailThread";
import {
  gmailThreadReplyService,
  gmailThreadService,
  outLookThreadReplyService,
  outlookThreadService,
} from "src/services/emails.service";
import MyEditor from "src/ui-component/editor/MyEditor";

import { formatDate, formatDateWithTime } from "src/utils/date";
import Spinner from "src/views/inbox/ui/miniLoader";
import ReplyIcon from "src/views/inbox/icons/ReplyIcon";
import SendIcon from "src/views/inbox/icons/SendIcon";

import { ClickTrackDataTypes } from "src/types/person";
import { useEmailsTab } from "src/hooks/persons/useEmailsTab";
import { devLog, devLogError } from "src/helpers/logs";
import { insertBodyLoader, removeBodyLoader } from "src/helpers/loaders";
import { ToastError, ToastSuccess } from "src/helpers/toast";

import { useUnreadCount } from "src/hooks/useUnreadCount";

type ReplyCount = {
  id: number;
  count: number;
  is_viewed: boolean;
};
interface Thread {
  id: number;
  to: string;
  html_message: string;
  from_email: number;
  thread_id: number;
  from: string;
  subject: string;
  body: string;
  date: string;
  mail_object: any;
  message_id: string;
  provider: string;
  mail_account: string;
  reply_count: ReplyCount;
}

type EmailThreadProps = {
  getPersonDetail: () => void;
};

const EmailThread: React.FC<EmailThreadProps> = ({ getPersonDetail }) => {
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailItem, setEmailitem] = useState<any>({});

  const [selectedThread, setSelectedThread] = useState<Thread[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showSendButton, setShowSendButton] = useState(true);
  const [replyMsg, setReplyMsg] = useState("");
  let { showStatus } = useEmailsTab(false);
  const { decrementUnreadCount } = useUnreadCount();

  let { emailThreads: originalEmailThreads } = useEmailThread(true, {
    limit: 99999,
    offset: 0,
  });

  const emailThreads = useMemo(() => {
    return originalEmailThreads.filter((email: any) => email.status !== 2); //exclude status 2 "scheduled";
  }, [originalEmailThreads]);

  useEffect(() => {
    console.log("useEffect triggered"); // To ensure the useEffect is being run
    console.log("emailThreads:", emailThreads); // To inspect the emailThreads array

    if (emailThreads && emailThreads.length > 0) {
      console.log("Setting selectedEmail:", emailThreads[0]); // To inspect what's being set
      handleSelectThread(emailThreads[0] as any);
    }
  }, [emailThreads]);

  useEffect(() => {
    let timer: NodeJS.Timeout; // Declare timer variable

    if (showEditor) {
      timer = setTimeout(() => {
        setShowSendButton(true);
      }, 3000); // Delay
    } else {
      setShowSendButton(false); // Optionally reset it if showEditor becomes false
    }

    return () => {
      clearTimeout(timer); // Cleanup timer when component unmounts or showEditor changes
    };
  }, [showEditor]);

  const handleSelectThread = async (item: Thread) => {
    console.log("Selected", item);
    setEmailitem(item);
    setIsLoading(true);
    setShowEditor(false);
    setSelectedEmail(item.id);
    let res: any;
    if (item.provider === "google") {
      res = await gmailThreadService(item.thread_id, item.from_email);
    } else if (item.provider === "outlook") {
      res = await outlookThreadService(item.thread_id, item.from_email);
    } else {
      return console.error("There is no valid provider given.");
    }

    if (res?.data) {
      setSelectedThread(res.data);
      console.log("Response from api", res.data);
    }

    setIsLoading(false);

    if (!item.reply_count?.is_viewed) {
      decrementUnreadCount();
    }
  };

  const handleMyEditorOnChange = (value: string) => {
    setReplyMsg(value);
  };

  const handleReply = () => {
    setShowEditor(true);
    const timer = setTimeout(() => {
      setShowSendButton(true);
    }, 1000);

    clearTimeout(timer);
    console.log("showEditor:", showEditor);
  };

  const handleSend = async () => {
    const data = {
      in_reply_to: emailItem.id,
      thread_id: selectedThread[0]["thread_id"],
      mail_object: selectedThread[0],
      html_message: replyMsg,
    };
    console.log("Data to send", data);

    insertBodyLoader();
    try {
      let res: any;
      if (selectedThread[0]["provider"] === "outlook") {
        res = await outLookThreadReplyService(data);
      } else {
        res = await gmailThreadReplyService(data);
      }
      devLog(() => {
        console.log({ res });
      });
      if (res.status === 200) {
        devLog(() => {
          console.log("res?.data", res?.data);
        });
        ToastSuccess("Email successfully sent.");
        setIsLoading((prev: any) => ({ ...prev, form: false }));
        removeBodyLoader();
        setShowEditor(false);
        handleSelectThread(emailItem);
        // getPersonDetail();
      }
    } catch (e: any) {
      setShowEditor(false);
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e);
      });
      removeBodyLoader();
    }
  };

  interface Props {
    emailThreads: any;
    selectedEmail: number | null;
    handleSelectThread: (email: any) => void;
    formatDate: (date: string) => string; // specify the signature that matches your formatDate function
  }

  const EmailThreadList: React.FC<Props> = ({
    emailThreads,
    selectedEmail,
    handleSelectThread,
    formatDate,
  }) => {
    return (
      <div className="tw-p-4 tw-border-r ">
        <div className="tw-text-center tw-font-bold">Subjects</div>
        <ul>
          {emailThreads
            .sort((a: any, b: any) => b.id - a.id)
            .map((email: any, index: number) => (
              <div
                key={index}
                className={classNames({
                  "tw-border-blue-500": selectedEmail === email.id,
                  "tw-bg-slate-100":
                    selectedEmail === email.id || !email.reply_count?.is_viewed,
                  "tw-font-bold": !email.reply_count?.is_viewed,
                  "tw-border-l-8": true,
                  "hover:tw-border-blue-500": true,
                  "tw-my-2": true,
                  "tw-py-4": true,
                  "tw-px-2": true,
                  "hover:tw-bg-slate-200": true,
                  "hover:tw-cursor-pointer": true,
                })}
                onClick={() => handleSelectThread(email)}
              >
                <div className="tw-flex-grow tw-text-xs tw-block">
                  {email.provider}
                </div>
                <div className="tw-flex tw-justify-between">
                  <div className="tw-block tw-text-xs  tw-truncate tw-w-[250px] tw-whitespace-nowrap">
                    {email.subject}
                  </div>
                  <div className="tw-block tw-text-xs">
                    {formatDate(email.created_date)}
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="tw-flex">
      {/* Left Column */}
      <EmailThreadList
        emailThreads={emailThreads}
        selectedEmail={selectedEmail}
        handleSelectThread={handleSelectThread}
        formatDate={formatDate}
      />

      {/* Right Column */}
      <div className="tw-relative tw-p-4 tw-w-3/4 ">
        {isLoading ? (
          <Spinner />
        ) : selectedThread.length > 0 ? (
          <>
            {/* Stats */}
            <div className="tw-flex tw-flex-col tw-mb-6 tw-border-b-4 tw-border-gray-700 ">
              <div>
                <strong>ID:&nbsp;{emailItem.id}</strong>
              </div>
              <div>
                <strong>Status:&nbsp;</strong>
                {emailItem?.status !== null ? (
                  showStatus(emailItem?.status)
                ) : (
                  <hr className="tw-w-3 tw-border-black tw-inline-block tw-ml-3" />
                )}
              </div>
              <div>
                <strong>Opened:&nbsp;</strong>
                {emailItem?.trackings?.opened ? "Yes" : "No"}
              </div>

              {emailItem?.click_tracking?.map(
                (data: ClickTrackDataTypes, index: number) => (
                  <div className="tw-ml-2" key={index}>
                    <span>
                      {data.url} - {data.click_count} clicks
                    </span>
                  </div>
                )
              )}
            </div>
            {/* Email Messages */}
            {selectedThread.map((thread, index) => (
              <div
                key={index}
                className={classNames(
                  "tw-mb-4 tw-border tw-rounded tw-border-slate-400 tw- tw-shadow-md tw-px-1 tw-py-2",
                  {
                    "tw-bg-green-50": emailItem.mail_account === thread.from,
                    "tw-bg-red-50": emailItem.mail_account !== thread.from,
                  }
                )}
              >
                <div className="tw-border tw-rounded ">
                  <div className="tw-text-xs tw-mb-1 tw-font-medium">
                    {formatDateWithTime(thread.date)}
                  </div>
                  <div className="tw-flex tw-justify-between">
                    <div className="">
                      From{" "}
                      {emailItem.mail_account === thread.from ? (
                        <span className="tw-bg-green-500 tw-px-1 tw-rounded tw-text-[10px] tw-text-white">
                          you{" "}
                        </span>
                      ) : (
                        <span className="tw-bg-red-500 tw-px-1 tw-rounded tw-text-[10px] tw-text-white">
                          client
                        </span>
                      )}
                      : {thread.from}
                    </div>

                    {/* <div className="tw-text-xs tw-text-gray-500 tw-italic">
                      {formatDateWithTime(thread.date)}
                    </div> */}
                  </div>
                  <div className="tw-flex tw-justify-between">
                    <div className="">
                      To{" "}
                      {emailItem.mail_account === thread.to ? (
                        <span className="tw-bg-green-500 tw-px-1 tw-rounded tw-text-[10px] tw-text-white">
                          you
                        </span>
                      ) : (
                        <span className="tw-bg-red-500 tw-px-1 tw-rounded tw-text-[10px] tw-text-white">
                          client
                        </span>
                      )}
                      : {thread.to}
                    </div>
                  </div>
                </div>
                <div className="tw-font-thin hover:tw-bg-slate-200 tw-px-6 tw-py-2 tw-border-t tw-border-slate-200 tw-mb-1">
                  <EmailContainer htmlEmailContent={cleanBody(thread.body)} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="tw-pt-4 tw-text-lg">No Email Sent Yet</p>
        )}

        {!isLoading && !showEditor && selectedEmail && (
          <div
            className="tw-text-white tw-border-primary hover:tw-border-blue-400 tw-p-2 tw-my-2 tw-text-sm tw-rounded tw-flex tw-space-x-2 tw-items-center tw-border-2 tw-w-28 tw-justify-center tw-bg-slate-100 hover:tw-bg-blue-200 hover:tw-cursor-pointer"
            onClick={handleReply}
          >
            <ReplyIcon color="tw-text-blue-500" />
            <span className="tw-text-black">Reply</span>
          </div>
        )}

        {showEditor && (
          <>
            <MyEditor
              initialValue={""}
              onEditorChange={(value: string, editor: any) => {
                handleMyEditorOnChange(value);
              }}
            />
            {showSendButton && (
              <div
                onClick={handleSend}
                className="tw-text-white tw-border-primary hover:tw-border-blue-400 tw-p-2 tw-mt-2 tw-text-sm tw-rounded tw-flex tw-space-x-2 tw-items-center tw-border tw-w-28 tw-justify-center tw-bg-slate-100 hover:tw-bg-blue-200 hover:tw-cursor-pointer"
              >
                <SendIcon color="tw-text-blue-500" />
                <span className="tw-text-black">Send</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailThread;
