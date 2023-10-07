import React, { useEffect, useState } from "react";

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
}

const EmailThread: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailItem, setEmailitem] = useState<any>({});

  const [selectedThread, setSelectedThread] = useState<Thread[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");

  let { emailThreads } = useEmailThread(true, {
    limit: 99999,
    offset: 0,
  });

  console.log({ emailThreads });
  useEffect(() => {
    console.log("useEffect triggered"); // To ensure the useEffect is being run
    console.log("emailThreads:", emailThreads); // To inspect the emailThreads array

    if (emailThreads && emailThreads.length > 0) {
      console.log("Setting selectedEmail:", emailThreads[0]); // To inspect what's being set
      handleSelectThread(emailThreads[0] as any);
    }
  }, [emailThreads]);

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
  };

  const handleMyEditorOnChange = (value: string) => {
    setReplyMsg(value);
  };

  const handleReply = () => {
    setShowEditor(true);
    console.log("showEditor:", showEditor);
  };

  const handleSend = async () => {
    console.log("Sending reply", replyMsg);
    console.log(selectedThread[0]);
    console.log("Thread ID", selectedThread[0]["thread_id"]);

    const data = {
      thread_id: selectedThread[0]["thread_id"],
      mail_object: selectedThread[0],
      html_message: replyMsg,
    };
    console.log(data);

    let res;
    if (selectedThread[0]["provider"] === "outlook") {
      res = await outLookThreadReplyService(data);
    } else {
      res = await gmailThreadReplyService(data);
    }

    if (res?.data) {
      console.log("res?.data", res.data);
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
                className={`${
                  selectedEmail === email.id ? " tw-border-blue-500" : ""
                } tw-border-l-2 hover:tw-border-blue-500 tw-my-2 tw-py-4 tw-px-2 hover:tw-bg-slate-200 hover:tw-cursor-pointer `}
                onClick={() => handleSelectThread(email)}
              >
                <div className="tw-flex-grow tw-text-xs tw-block">
                  {email.provider}
                </div>
                <div className="tw-flex tw-justify-between">
                  <div className="tw-block tw-text-xs tw-truncate tw-w-[250px] tw-whitespace-nowrap">
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
      <div className="tw-relative tw-p-4 tw-w-3/4">
        {isLoading ? (
          <Spinner />
        ) : selectedThread.length > 0 ? (
          <>
            {selectedThread.map((thread, index) => (
              <div
                key={index}
                className={
                  emailItem.mail_account === thread.from
                    ? "tw-bg-green-50"
                    : "tw-bg-red-50"
                }
              >
                <div className="tw-border tw-mb-2 tw-rounded tw-p-3">
                  <div className="tw-text-xs tw-text-gray-500 tw-italic">
                    {formatDateWithTime(thread.date)}
                  </div>
                  {/* assuming thread has an 'id' field */}
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
                <div className="tw-font-thin hover:tw-bg-slate-200 tw-px-6 tw-py-4 tw-border-t tw-border-slate-200 tw-mb-1">
                  <EmailContainer htmlEmailContent={cleanBody(thread.body)} />
                </div>

                {index === selectedThread.length - 1 && !showEditor && (
                  <div
                    className="tw-text-white tw-p-1 tw-mt-2 tw-text-sm tw-rounded tw-flex tw-space-x-2 tw-items-center tw-border tw-w-28 tw-justify-center tw-bg-slate-100 hover:tw-bg-slate-200 hover:tw-cursor-pointer"
                    onClick={handleReply}
                  >
                    <ReplyIcon color="tw-text-blue-500" />
                    <span className="tw-text-black">Reply</span>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="tw-pt-4">Select a subject to see the details</p>
        )}

        {showEditor && (
          <>
            <MyEditor
              initialValue={""}
              onEditorChange={(value: string, editor: any) => {
                handleMyEditorOnChange(value);
              }}
            />
            <div
              onClick={handleSend}
              className="tw-text-white tw-p-1 tw-mt-2 tw-text-sm tw-rounded tw-flex tw-space-x-2 tw-items-center tw-border tw-w-28 tw-justify-center tw-bg-slate-100 hover:tw-bg-slate-200 hover:tw-cursor-pointer"
            >
              <SendIcon color="tw-text-blue-500" />
              <span className="tw-text-black">Send</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailThread;
