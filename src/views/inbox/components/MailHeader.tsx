import React from "react";
import {
  ArrowBack,
  ArchiveOutlined,
  WatchLaterOutlined,
  ChevronLeft,
  ChevronRight,
  Reply,
  MoreVert,
} from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import TooltipComponent from "src/ui-component/tour/Tooltip";

interface MailHeaderProps {
  onPressBack?: () => void;
  onPressArchive?: () => void;
  onPressWatchLater?: () => void;
  onPressPrev?: () => void;
  onPressNext?: () => void;
  onPressReply?: () => void;
  onPressMore?: () => void;
  currentPage?: number;
  totalPages?: number;
  personId?: number;
}

export const MailHeader: React.FC<MailHeaderProps> = ({
  onPressBack,
  onPressArchive,
  onPressWatchLater,
  onPressPrev,
  onPressNext,
  onPressReply,
  onPressMore,
  currentPage = 0,
  totalPages = 0,
  personId
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      borderBottom={1}
      borderColor="#f0f1f3"
      paddingX={3}
      paddingY={2}
      className="tw-h-[calc(9.6vh)]"
    >
      {/* <Stack spacing={1} direction="row" justifyItems="center">
        <IconButton onClick={onPressBack}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <IconButton onClick={onPressArchive}>
          <ArchiveOutlined fontSize="small" />
        </IconButton>
        <IconButton onClick={onPressWatchLater}>
          <WatchLaterOutlined fontSize="small" />
        </IconButton>
      </Stack>
      <Stack
        spacing={1}
        direction="row"
        justifyItems="center"
        alignItems="center"
      >
        <IconButton onClick={onPressPrev}>
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography fontSize="small">
          {currentPage} of {totalPages}
        </Typography>
        <IconButton onClick={onPressNext}>
          <ChevronRight fontSize="small" />
        </IconButton>
      </Stack> */}
      <Stack spacing={1} direction="row">
        <TooltipComponent text="Click here to see the profile">
          <a
            // href="your-link-here"
            href={`/people/${personId}`}
            className="tw-text-white tw-p-1 tw-mt-2 tw-text-sm tw-rounded tw-flex tw-space-x-2 tw-items-center tw-border tw-w-28 tw-justify-center tw-bg-slate-100 hover:tw-bg-slate-200 hover:tw-cursor-pointer"
          >
            <span className="tw-text-black">View Profile</span>
          </a>
        </TooltipComponent>
        
        <IconButton onClick={onPressReply} style={{position: "absolute", right:"1.5em"}}>
        <TooltipComponent text="Click here to reply the email">
          <Reply fontSize="small" />
          </TooltipComponent>
        </IconButton>
        
        {/* <IconButton onClick={onPressMore}>
          <MoreVert fontSize="small" />
        </IconButton> */}
      </Stack>
    </Stack>
  );
};
