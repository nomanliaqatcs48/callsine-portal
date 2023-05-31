import { useState } from "react";

export const usePlaybookV2 = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
  };
};
