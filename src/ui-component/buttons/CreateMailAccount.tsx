import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

import { useState } from "react";
import GoogleAddEmailAccount from "src/views/authentication/auth-forms/google/GoogleAddEmailAccount";
import MicrosoftAddEmailAccount from "src/views/authentication/auth-forms/microsoft/MicrosoftAddEmailAccount";
type CreateOrEditMailAccountTypes = {
  children?: any;
  onLoadApi?: any;
  defaultValue?: any;
  onClick: any;
  [x: string]: any;
};

const CreateMailAccount = ({
  children,
  onLoadApi,
  defaultValue,
  onClick,
  ...props
}: CreateOrEditMailAccountTypes) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          onClick();
        }}
        className="tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-text-primary"
        {...props}
      >
        {children}
      </Button>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          fullWidth={true}
          maxWidth="xl"
          aria-labelledby="Add Mail account"
          aria-describedby="Add Mail account modal"
          disableEnforceFocus={true}
        >
          <DialogTitle variant="h4" className="tw-pt-10">
            Add Mail Account
          </DialogTitle>
          <DialogContent className="flex flex-tw-space-y-5">
            <MicrosoftAddEmailAccount />
            <GoogleAddEmailAccount />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreateMailAccount;
