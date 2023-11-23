import * as React from "react";

import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { stringAvatar } from "src/helpers/strings";
import { formatDate } from "src/utils/date";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useUnreadCount } from "src/hooks/useUnreadCount";

interface EmailProps {
  item: any;
  index: number;
  handleOnClickEmail: any;
  isSelected: boolean;
  handleSelectThread: any;
  selectedEmail: number;
  handleSubjectBoldFont: any
}

const Email: React.FC<EmailProps> = ({ item, index, handleOnClickEmail, isSelected = false, handleSelectThread, selectedEmail, handleSubjectBoldFont}) => {
  const { unreadEmails } = useUnreadCount();

  const handleSubjectBold = (item: any) => {
    console.log("Handle Subject bold", item);
    console.log("Unread emails", unreadEmails);
    const anyExist = unreadEmails.some((unreadEmail: any) =>
      item.emails.find((email: any) => email.id === unreadEmail.id)
    );

    if (anyExist) {
      console.log("At least one unread email exists in items.");
      return true;
    } else {
      console.log("No unread emails exist in items.");
      return false;
    }
  };

  return (
    <>
    <Stack
      key={item.recipient}
      direction="row"
      padding={2}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      maxWidth={450}
      minWidth={450}
      onClick={() => handleOnClickEmail()}
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
            className={`tw-text-[16px] ${
              handleSubjectBold(item) ? "tw-font-bold" : ""
            }`}
          >
            {/* {console.log(item)} */}

            {item.recipient_name || item.recipient}
          </Typography>
        </Stack>
      </Stack>
      <span className="tw-px-2 tw-text-left tw-flex tw-justify-between tw-text-sm">
        <span
          className={`tw-ml-2 tw-text-gray-300 tw-transition-transform`}
        >
          {isSelected ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
        </span>
      </span>
      
    </Stack>
    {isSelected && item?.emails?.length > 0 && item.emails.filter((email: any) => email.status === 0) //only show status = 0 "sent"
    .map((email: any, index: number) => (
      <Stack
        py={2}
        px={3}
        key={`${email.subject}-${index}`}
        onClick={() => handleSelectThread(email, index)}
        className={`tw-w-full tw-border-b tw-border-[#f0f1f3] tw-cursor-pointer hover:tw-bg-gray-100 tw-transition-colors tw-duration-300 ${
          selectedEmail === index &&
          `tw-border-l-[10px] tw-border-l-primary`
        }`}
      >
        <Stack direction="row" justifyContent="space-between">
          {/* <Typography className="tw-font-medium tw-text-[16px]"> */}
          <Typography
            className={`tw-text-xs ${
              handleSubjectBoldFont(email)
                ? "tw-font-medium"
                : "tw-font-thin"
            }`}
          >
            {email.subject}
          </Typography>
          <Typography
            className={`tw-text-xs tw-w-[80px] ${
              handleSubjectBoldFont(email)
                ? "tw-font-medium"
                : "tw-font-thin"
            }`}
          >
            {formatDate(email.modified_date)}
          </Typography>
        </Stack>
        <br />
        {/*  */}
      </Stack>
    ))}
    </>
  );
};

export { Email };
