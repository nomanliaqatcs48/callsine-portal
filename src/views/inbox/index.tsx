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
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { MailHeader } from "./components/MailHeader";
import { InboxSidebar } from "./components/InboxSidebar";
import { EmailThread, Thread } from "src/types/inbox";
import { devLog } from "src/helpers/logs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";

const InboxPage: React.FC = () => {
  const [selectedThread, setSelectedThread] = useState<Thread[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailItem, setEmailitem] = useState<any>(null);
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
    <>
      <Box className="tw-mb-10">
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          Inbox
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal">
                  Inbox is the default view in your mailbox. It contains all the
                  emails you’ve received, read, and haven’t deleted.
                </Typography>
              </React.Fragment>
            }
          >
            <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
          </HtmlTooltip>
        </Typography>
      </Box>
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <div className="tw-flex tw-flex-row">
          <InboxSidebar
            emailThreads={emailThreads}
            onSelectThread={handleSelectThread}
          />
          {/* Right Column */}
          <div className="tw-w-[calc(100vw-400)]">
            {selectedThread.length > 0 && (
              <MailHeader totalPages={emailItem?.length} />
            )}
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
                          <div className="">{thread.from_email}</div>

                          {/* <div className="tw-text-xs tw-text-gray-500 tw-italic">
                      {formatDateWithTime(thread.date)}
                    </div> */}
                        </div>
                        <div className="tw-flex tw-justify-between">
                          <div className="">To: {thread.to}</div>

                          <div className="tw-text-xs tw-text-gray-500 tw-italic">
                            {formatDateWithTime(thread.created_date)}
                          </div>
                        </div>

                        <p
                          className="tw-font-thin hover:tw-bg-slate-200 tw-py-2"
                          dangerouslySetInnerHTML={{
                            __html: xss(
                              cleanBody(thread.html_message || thread.body)
                            ),
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
                <p className="tw-pt-4">...</p>
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
          </div>
        </div>
      </Paper>
    </>
  );
};

export default InboxPage;
