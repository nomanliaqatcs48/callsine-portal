import React, { useState } from "react";
import { ToastError, ToastSuccess } from "src/helpers/toast";
import { useEmailThread } from "src/hooks/persons/useEmailThread";
import {
  outlookThreadService,
  gmailThreadReplyService,
  gmailThreadService,
  outLookThreadReplyService,
} from "src/services/emails.service";
import MyEditor from "src/ui-component/editor/MyEditor";
import { formatDate, formatDateWithTime } from "src/utils/date";
import xss from "xss";
import ReplyIcon from "./icons/ReplyIcon";
import Spinner from "./ui/miniLoader";
import SendIcon from "./icons/SendIcon";
import { Box, Grid, Typography } from "@mui/material";

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

const InboxPage: React.FC = () => {
  const [selectedThread, setSelectedThread] = useState<Thread[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailItem, setEmailitem] = useState<any>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      return console.error("There is no valid provider given..");
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

  const handleMyEditorOnChange = (value: string) => {
    setReplyMsg(value);
  };

  const handleReply = () => {
    setShowEditor(true);
  };

  const cleanBody = (html_body: any) => {
    const body_ = html_body.toString();
    let regex =
      /(<html><head>[\s\S]*<body>)([\s\S]*)(<\/body>[\s\S]*<\/html>)/g;
    let body = body_.replace(regex, "$2");
    return body;
  };

  const handleSend = async () => {
    setIsLoading(true);
    setShowEditor(false);
    const item = {
      thread_id: selectedThread[0]["thread_id"],
      mail_object: selectedThread[0],
      html_message: replyMsg,
      provider: selectedThread[0]["provider"],
    };

    let res: any;
    if (item.provider === "google") {
      res = await gmailThreadReplyService(item);
    } else if (item.provider === "outlook") {
      const lastMailObject = selectedThread[selectedThread.length - 1];
      item.mail_object = lastMailObject;
      res = await outLookThreadReplyService(item);
    } else {
      return console.error("There is no valid provider given.");
    }
    if (res.status === 200) {
      ToastSuccess("Email sent.");
    } else {
      ToastError("Sending Email failed.");
    }

    await handleSelectThread(emailItem);
    setIsLoading(false);
  };

  return (
    <Box className="tw-bg-white tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]">
      <Grid container className="tw-p-0">
        {/* Left Column */}
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          className="sm:tw-border-r-[1px] sm:tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6"
        >
          <div className="tw-px-5 tw-border-b-[1px] tw-border-[#f0f1f3]">
            <Typography variant="h3" fontWeight="bold">
              Inbox
            </Typography>
            <input
              placeholder="Search"
              type="text"
              className="tw-bg-[#f8fafc] tw-w-full tw-rounded-full tw-py-2 tw-px-6 tw-my-4 focus-visible:tw-border-0 focus-visible:tw-outline-none"
            />
          </div>
          <ul className="tw-p-3">
            {emailThreads.map((item: any, index) => (
              <div key={index} className="border-b-2">
                <button
                  className="tw-w-full tw-px-2 tw-py-2 tw-text-left tw-flex tw-justify-between tw-text-sm"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {item.recipient} ({item.count})
                  <span
                    className={`tw-ml-2 ${
                      openIndex === index ? "tw-rotate-180" : ""
                    } tw-transition-transform`}
                  >
                    ▼
                  </span>
                </button>
                {openIndex === index && (
                  <div className="tw-pl-2">
                    {item.emails.map((email: any, index: number) => (
                      <div
                        key={index}
                        className={`${
                          selectedEmail === email.id
                            ? " tw-border-blue-500"
                            : ""
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
                  </div>
                )}
              </div>
            ))}
          </ul>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} sm={7} lg={8}>
          <Box className="tw-p-10">
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InboxPage;
