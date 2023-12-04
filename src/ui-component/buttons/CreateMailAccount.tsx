import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

import { useState } from "react";
import GoogleAddEmailAccount from "src/views/authentication/auth-forms/google/GoogleAddEmailAccount";
import MicrosoftAddEmailAccount from "src/views/authentication/auth-forms/microsoft/MicrosoftAddEmailAccount";
type CreateOrEditMailAccountTypes = {
  children?: any;
  onLoadApi?: any;
  defaultValue?: any;
  initialOpen?: boolean;
  onClick: any;
  [x: string]: any;
};

const CreateMailAccount = ({
  children,
  onLoadApi,
  defaultValue,
  initialOpen = false,
  onClick,
  ...props
}: CreateOrEditMailAccountTypes) => {
  const [open, setOpen] = useState(initialOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClick();
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
          maxWidth="lg"
          aria-labelledby="Add Mail account"
          aria-describedby="Add Mail account modal"
          disableEnforceFocus={true}
          fullWidth={false}
        >
          <div className="tw-w-96">
            <DialogTitle variant="h4" className="tw-text-center tw-pt-10">
              Add Mail Account
            </DialogTitle>
            <DialogContent className="tw-flex tw-space-x-11 tw-items-center">
              <MicrosoftAddEmailAccount />
              <GoogleAddEmailAccount />
            </DialogContent>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default CreateMailAccount;
