import * as React from "react";

import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { stringAvatar } from "src/helpers/strings";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface EmailProps {
  item: any;
  index: number;
  isSelected: boolean;
}

const Email: React.FC<EmailProps> = ({ item, index, isSelected = false }) => {
  const hasUnreadEmail = item.emails.some(
    (email: any) => email.reply_count.is_viewed === false
  );

  return (
    <Stack
      key={item.recipient}
      direction="row"
      padding={2}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      maxWidth={450}
      minWidth={450}
      className="tw-cursor-pointer tw-border-b tw-border-[#f0f1f3] hover:tw-bg-gray-100 tw-transition-colors tw-duration"
    >
      <Stack direction="row" spacing={1}>
        <Avatar {...stringAvatar(item?.recipient_name || item.recipient)} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            className={`tw-text-[16px] ${hasUnreadEmail ? "tw-font-bold" : ""}`}
          >
            {/* {console.log(item)} */}

            {item.recipient_name || item.recipient}
          </Typography>
        </Stack>
      </Stack>
      <span className="tw-px-2 tw-text-left tw-flex tw-justify-between tw-text-sm">
        <span
          className={`tw-ml-2 tw-text-gray-300 ${
            isSelected ? "tw-rotate-180" : ""
          } tw-transition-transform`}
        >
          <ArrowForwardIosIcon />
        </span>
      </span>
    </Stack>
  );
};

export { Email };
