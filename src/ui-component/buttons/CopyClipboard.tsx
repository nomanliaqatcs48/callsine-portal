import React, { useLayoutEffect } from "react";
import { Avatar, ButtonBase, Tooltip } from "@mui/material";
import { IconCopy } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";
import ClipboardJS from "clipboard";

type CopyClipboardTypes = {
  copyContent: string | null;
  onClick: any;
};

const CopyClipboard = ({ copyContent, onClick }: CopyClipboardTypes) => {
  const theme: any = useTheme();
  const copyBtn = React.useRef(null);
  const [show, setShow] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

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

  const handleClick = () => {
    onClick();
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip open={open} onClose={handleClose} title="Copied">
      <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <div
          onClick={handleClick}
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
    </Tooltip>
  );
};

export default CopyClipboard;
