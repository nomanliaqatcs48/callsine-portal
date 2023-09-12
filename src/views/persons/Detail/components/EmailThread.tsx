import React, { useState } from "react";

import { useEmailThread } from "src/hooks/persons/useEmailThread";
import {
  gmailThreadReplyService,
  gmailThreadService,
  outlookThreadService,
} from "src/services/emails.service";
import MyEditor from "src/ui-component/editor/MyEditor";
import xss from "xss";
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
}

const EmailThread: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailItem, setEmailitem] = useState<any>({});

  const handleSelectThread = async (item: Thread) => {
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
    }
    setIsLoading(false);
  };
  let { emailThreads } = useEmailThread(true, {
    limit: 99999,
    offset: 0,
  });

  console.log({ emailThreads });

  const cleanBody = (html_body: any) => {
    const body_ = html_body.toString();
    let regex =
      /(<html><head>[\s\S]*<body>)([\s\S]*)(<\/body>[\s\S]*<\/html>)/g;
    let body = body_.replace(regex, "$2");
    return body;
  };

  const [selectedThread, setSelectedThread] = useState<Thread[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");

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
    let res = await gmailThreadReplyService(data);
    if (res?.data) {
      console.log("res?.data", res.data);
    }
  };

  return (
    <div className="tw-flex">
      {/* Left Column */}
      <div className="tw-p-4 tw-border-r ">
        <div className="tw-text-center tw-font-bold">Subjects</div>
        <ul>
          {emailThreads.map((email: any, index: number) => (
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

      {/* Right Column */}
      <div className="tw-relative tw-p-4 tw-w-3/4">
        {isLoading ? (
          <Spinner />
        ) : selectedThread.length > 0 ? (
          <>
            {selectedThread.map((thread, index) => (
              <div key={index}>
                <div className="tw-border tw-mb-2 tw-rounded tw-p-3">
                  {/* assuming thread has an 'id' field */}
                  <div className="tw-flex tw-justify-between">
                    <div className="">{thread.from}</div>

                    {/* <div className="tw-text-xs tw-text-gray-500 tw-italic">
                      {formatDateWithTime(thread.date)}
                    </div> */}
                  </div>
                  <div className="tw-flex tw-justify-between">
                    <div className="">To: {thread.to}</div>

                    <div className="tw-text-xs tw-text-gray-500 tw-italic">
                      {formatDateWithTime(thread.date)}
                    </div>
                  </div>

                  <p
                    className="tw-font-thin hover:tw-bg-slate-200 tw-py-2"
                    dangerouslySetInnerHTML={{
                      __html: xss(cleanBody(thread.body)),
                    }}
                  />
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
