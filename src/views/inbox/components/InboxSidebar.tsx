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
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { EmailThread } from "src/types/inbox";
import { stringAvatar } from "src/helpers/strings";
import { cleanBody } from "src/helpers/mail";

interface InboxSidebarProps {
  emailThreads: EmailThread[];
  onSelectThread: any;
}

export const InboxSidebar: React.FC<InboxSidebarProps> = ({
  emailThreads,
  onSelectThread,
}) => {
  const handleSelectThread = (email: any) => {
    if (email) {
      onSelectThread(email);
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm={5}
      lg={4}
      className="sm:tw-border-r-[1px] sm:tw-border-[#f0f1f3] tw-py-6 xl:tw-py-6 tw-min-h-[50vh]"
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
      <Stack direction="column">
        {emailThreads.map((email, index) => (
          <Stack
            direction="row"
            padding={2}
            justifyItems="center"
            alignItems="top"
            spacing={2}
          >
            <Avatar
              {...stringAvatar(email?.recipient_name || email.recipient)}
            />
            <Stack direction="column" spacing={1}>
              <Typography color="black">
                {email.recipient_name || email.recipient}
              </Typography>
              <Typography fontWeight="bold">
                {email.emails && email.emails.length > 0
                  ? email.emails[0].subject
                  : ""}
              </Typography>
              <p
                className="tw-text-gray-500 tw-font-[12px]"
                dangerouslySetInnerHTML={{
                  __html: xss(
                    cleanBody(
                      email.emails && email.emails.length > 0
                        ? email.emails[0].html_message
                        : ""
                    )
                  ),
                }}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Grid>
  );
};
