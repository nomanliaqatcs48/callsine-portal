import React from "react";
import { Avatar, ButtonBase } from "@mui/material";
import { IconCopy } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

const CopyClipboard = () => {
  const theme: any = useTheme();

  return (
    <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <Avatar
        variant="rounded"
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.mediumAvatar,
          transition: "all .2s ease-in-out",
          background: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
          "&:hover": {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light,
          },
        }}
        onClick={() => null}
        color="inherit"
      >
        <IconCopy stroke={1.5} size="1.3rem" />
      </Avatar>
    </ButtonBase>
  );
};

export default CopyClipboard;
