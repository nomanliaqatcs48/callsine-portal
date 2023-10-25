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
import { cleanBody, EmailContainer } from "src/utils/people/emailThread";
import classNames from "classnames";

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

  // const cleanBody = (html_body: any) => {
  //   try {
  //     const body_ = html_body.toString();
  //     let regex =
  //       /(<html><head>[\s\S]*<body>)([\s\S]*)(<\/body>[\s\S]*<\/html>)/g;
  //     let body = body_.replace(regex, "$2");
  //     return body;
  //   } catch (error) {
  //     devLog(() => {
  //       console.log("error", error);
  //     });
  //   }
  // };

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

  const handleOnReset = () => {
    setSelectedThread([]);
    setIsLoading(false);
  };
  
  console.log(selectedThread)
  // console.log(emailItem.mail_account)
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
            onReset={handleOnReset}
          />
          {/* Right Column */}
          <div className="tw-w-full tw-h-full">
            {selectedThread.length > 0 && (
              <MailHeader
                totalPages={selectedThread?.length}
                onPressReply={handleReply}
              />
            )}
            <Box className="tw-p-8 tw-h-[calc(100vh-8vh)] tw-bg-slate-50 tw-overflow-y-scroll">
              {isLoading ? (
                <div className="tw-w-full">
                  <Spinner />
                </div>
              ) : selectedThread.length > 0 ? (
                <Stack spacing={2}>
                  
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
                        <div className="tw-flex tw-justify-between">                                           
                          <div className="">{thread.from_email}</div>
                        </div>
                        <div className="tw-text-xs tw-text-gray-500 tw-italic">
                          {formatDateWithTime(thread.createdDateTime)}
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

                        <p
                          className="tw-font-thin hover:tw-bg-slate-200 tw-py-2"
                          dangerouslySetInnerHTML={{
                            __html: xss(
                              cleanBody(thread.html_message || thread.body)
                            ),
                          }}
                        />
                        {/* <EmailContainer
                          className="hover:tw-bg-slate-200 tw-py-2"
                          htmlEmailContent={cleanBody(
                            thread.html_message || thread.body
                          )}
                        /> */}
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
                </Stack>
              ) : (
                <p className="tw-pt-4">...</p>
              )}
              <Box height="20px" />
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
