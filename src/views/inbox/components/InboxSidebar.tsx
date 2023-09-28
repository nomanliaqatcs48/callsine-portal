import React from "react";
import { formatTime } from "src/utils/date";
import xss from "xss";
import { Avatar, Divider, Grid, Stack, Typography } from "@mui/material";
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
  const [hiddenIndex, setHiddenIndex] = React.useState<number[]>([]);

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
      className="sm:tw-border-r-[1px] sm:tw-border-[#f0f1f3] tw-py-6 xl:tw-py-6 tw-min-h-[50vh] tw-max-h-[85vh]"
    >
      <div className="tw-px-5 tw-border-b-[1px] tw-border-[#f0f1f3] tw-relative tw-h-[100px]">
        <Typography variant="h3" fontWeight="bold">
          Inbox
        </Typography>
        <input
          placeholder="Search"
          type="text"
          className="tw-bg-[#f8fafc] tw-w-full tw-rounded-full tw-py-2 tw-px-6 tw-my-4 focus-visible:tw-border-0 focus-visible:tw-outline-none"
        />
      </div>
      <Stack
        direction="column"
        divider={<Divider />}
        className="tw-overflow-y-scroll tw-h-[calc(85vh-130px)]"
      >
        {emailThreads.map((item, index) => (
          <Stack
            key={item.recipient}
            direction="row"
            padding={2}
            justifyItems="center"
            alignItems="top"
            spacing={2}
          >
            <Avatar {...stringAvatar(item?.recipient_name || item.recipient)} />
            <Stack direction="column" spacing={1} className="tw-w-full">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography className="tw-text-[16px]">
                  {item.recipient_name || item.recipient}
                </Typography>
                <span
                  className=" tw-px-2 tw-text-left tw-flex tw-justify-between tw-text-sm"
                  onClick={() => {
                    if (hiddenIndex.includes(index)) {
                      setHiddenIndex(hiddenIndex.filter((i) => i !== index));
                    } else {
                      setHiddenIndex([...hiddenIndex, index]);
                    }
                  }}
                >
                  <span
                    className={`tw-ml-2 tw-text-gray-300 ${
                      hiddenIndex.includes(index) ? "tw-rotate-180" : ""
                    } tw-transition-transform`}
                  >
                    ▼
                  </span>
                </span>
              </Stack>
              <Stack>
                {!hiddenIndex.includes(index) &&
                  item.emails &&
                  item.emails.map((email, index) => (
                    <div
                      key={`${email.subject}-${index}`}
                      onClick={() => handleSelectThread(email)}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography className="tw-font-medium tw-text-[16px]">
                          {email.subject}
                        </Typography>
                        <Typography>
                          {formatTime(email.created_date)}
                        </Typography>
                      </Stack>
                      <br />
                      <p
                        className="tw-text-gray-500 tw-text-[16px] tw-font-thin tw-tracking-wider"
                        dangerouslySetInnerHTML={{
                          __html: xss(
                            cleanBody(email.html_message, {
                              breaklines: true,
                              links: true,
                            }).substring(0, 150) + "..."
                          ),
                        }}
                      />
                    </div>
                  ))}
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Grid>
  );
};
