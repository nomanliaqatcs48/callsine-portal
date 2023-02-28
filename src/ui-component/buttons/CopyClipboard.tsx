import React, { useLayoutEffect, useRef, useState } from "react";
import { Avatar, ButtonBase } from "@mui/material";
import { IconCopy } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";
import ClipboardJS from "clipboard";

type CopyClipboardTypes = {
  copyContent: string | null;
  onClick: any;
};

const CopyClipboard = ({ copyContent, onClick }: CopyClipboardTypes) => {
  const theme: any = useTheme();
  const copyBtn = useRef(null);
  const [show, setShow] = useState<boolean>(false);

  useLayoutEffect(() => {
    let _cl: any = document.querySelector(".clipboard");
    if (_cl) {
      // devLog("_cl", _cl);
      let _clipboard = new ClipboardJS(".clipboard");

      _clipboard.on("success", function (e) {
        // devLog("Action:", e.action);

        if (e.action === "copy") {
          setShow(true);
          setTimeout(() => setShow(false), 4000);
        }
        // devLog("Text:", e.text);
        // devLog("Trigger:", e.trigger);
        e.clearSelection();
      });

      _clipboard.on("error", function (e) {
        // devLogError("Action:", e.action); devLogError("Trigger:", e.trigger);
      });
    }
  }, []);

  return (
    <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <div
        onClick={onClick}
        data-clipboard-text={copyContent}
        ref={copyBtn}
        className="clipboard"
      >
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
          color="inherit"
        >
          <IconCopy stroke={1.5} size="1.3rem" />
        </Avatar>
      </div>
    </ButtonBase>
  );
};

export default CopyClipboard;
