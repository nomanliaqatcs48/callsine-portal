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
import { Box, IconButton, Typography } from "@mui/material";

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
}) => {
  return (
    <Box className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-py-4 tw-px-6 tw-border-b-[1px] tw-border-b-[#f0f1f3]">
      <Box className="tw-flex tw-flex-row tw-space-x-1 tw-items-center">
        <IconButton onClick={onPressBack}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <IconButton onClick={onPressArchive}>
          <ArchiveOutlined fontSize="small" />
        </IconButton>
        <IconButton onClick={onPressWatchLater}>
          <WatchLaterOutlined fontSize="small" />
        </IconButton>
      </Box>
      <Box className="tw-flex tw-flex-row tw-space-x-1 tw-items-center">
        <IconButton onClick={onPressPrev}>
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography fontSize="small">
          {currentPage} of {totalPages}
        </Typography>
        <IconButton onClick={onPressNext}>
          <ChevronRight fontSize="small" />
        </IconButton>
      </Box>
      <Box className="tw-flex tw-flex-row tw-space-x-1 tw-items-center">
        <IconButton onClick={onPressReply}>
          <Reply fontSize="small" />
        </IconButton>
        <IconButton onClick={onPressMore}>
          <MoreVert fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
