import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Paper, Stack, Typography } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";
import { ToastError, ToastSuccess } from "src/helpers/toast";
import { useEmailThread } from "src/hooks/persons/useEmailThread";
import {
  gmailThreadReplyService,
  gmailThreadService,
  outLookThreadReplyService,
  outlookThreadService,
  viewToTrueService,
} from "src/services/emails.service";
import { Thread } from "src/types/inbox";
import MyEditor from "src/ui-component/editor/MyEditor";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";
import { formatDateWithTime } from "src/utils/date";
import { cleanBody } from "src/utils/people/emailThread";
import xss from "xss";
import { InboxSidebar } from "./components/InboxSidebar";
import { MailHeader } from "./components/MailHeader";
import ReplyIcon from "./icons/ReplyIcon";
import SendIcon from "./icons/SendIcon";
import Spinner from "./ui/miniLoader";
import { LoadingButton } from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import { useUnreadCount } from "src/hooks/useUnreadCount";
import { getUnreadReplies } from "src/store/emailReplyCount/actions";

import { store } from "src/store";

const InboxPage: React.FC = () => {
  const [selectedThread, setSelectedThread] = useState<Thread[]>([]);
  // const editorRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [showEditor, setShowEditor] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailItem, setEmailitem] = useState<any>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { decrementUnreadCount, unreadEmails } = useUnreadCount();

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
      let exists = unreadEmails.some((i: any) => i.id === item.id);

      if (exists) {
        decrementUnreadCount();

        await viewToTrueService(item.reply_count.id);
        await store.dispatch(getUnreadReplies());
      }
    }
  };

  let { emailThreads } = useEmailThread(true, {
    limit: 99999,
    offset: 0,
  });

  const handleMyEditorOnChange = (value: string) => {
    setReplyMsg(value);
  };

  const handleReply = () => {
    // editorRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowEditor(true);
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

  const handleOnReset = () => {
    setSelectedThread([]);
    setIsLoading(false);
  };

  const handleOriginIndicator = (email: any) => {
    let str = emailItem.mail_account;
    let substring = email.toLowerCase();

    return substring.toLowerCase().includes(str) ? (
      <span className="tw-bg-green-500 tw-px-1 tw-rounded tw-text-[10px] tw-text-white">
        you{" "}
      </span>
    ) : (
      <span className="tw-bg-red-500 tw-px-1 tw-rounded tw-text-[10px] tw-text-white">
        client
      </span>
    );
  };

  console.log(selectedThread);
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
                  Inbox is the default view of your mailbox. It contains all the
                  emails you’ve sent, received, read, and haven’t deleted in
                  CallSine. You can use this view to track your activity as well
                  as reply directly to any email.
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
                personId={emailItem.person_id}
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
                          "tw-bg-white": emailItem.mail_account === thread.from,
                          "tw-bg-slate-100":
                            emailItem.mail_account !== thread.from,
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
                            <div className="">
                              {handleOriginIndicator(thread.from)}{" "}
                              {`From : ${thread.from}`}
                            </div>
                          </div>
                        </div>
                        <div className="tw-flex tw-justify-between">
                          <div className="">
                            {handleOriginIndicator(thread.to)}{" "}
                            {`To: ${thread.to}`}
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
                </Stack>
              ) : (
                <p className="tw-pt-4">...</p>
              )}
              <Box height="20px" />
              {showEditor && (
                <>
                  {/* <div ref={editorRef}> */}
                  <MyEditor
                    initialValue={""}
                    onEditorChange={(value: string, editor: any) => {
                      handleMyEditorOnChange(value);
                    }}
                  />
                  {/* </div> */}
                  {/* <div
                    onClick={handleSend}
                    className="tw-text-white tw-p-1 tw-mt-2 tw-text-sm tw-rounded tw-flex tw-space-x-2 tw-items-center tw-border tw-w-28 tw-justify-center tw-bg-slate-100 hover:tw-bg-slate-200 hover:tw-cursor-pointer"
                  >
                    <SendIcon color="tw-text-blue-500" />
                    <span className="tw-text-black">Send</span>
                  </div> */}
                  <LoadingButton
                    type="button"
                    variant="outlined"
                    onClick={handleSend}
                    className="tw-border tw-border-[#1976d2] tw-flex tw-justify-around tw-items-center tw-py-2 sm:tw-py-3 lg:tw-px-5 tw-mt-3"
                  >
                    <span className="tw-px-1.5 tw-text-primary tw-text-xs tw-uppercase tw-font-medium">
                      Send
                    </span>{" "}
                    <SendOutlinedIcon sx={{ fontSize: 20, color: "#3586d7" }} />
                  </LoadingButton>
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
