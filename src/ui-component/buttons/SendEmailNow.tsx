import React, { useState } from "react";
import { Button, DialogActions, Typography } from "@mui/material";
import MyModal from "../modal/MyModal";
import { devLogError } from "../../helpers/logs";
import { deleteMailAccountService } from "../../services/mail-accounts.service";
import { sendEmailService } from "../../services/emails.service";
import { LoadingButton } from "@mui/lab";

type SendEmailNowTypes = {
  id: number;
  buttonText: string;
  onLoadApi?: any;
};

const SendEmailNow = ({ id, buttonText, onLoadApi }: SendEmailNowTypes) => {
  const [isLoading, setIsLoading] = useState<any>({
    button: false,
  });

  const handleSend = async () => {
    setIsLoading((prev: any) => ({ ...prev, button: true }));
    try {
      let res = await sendEmailService(id);
      if (res?.data) {
        onLoadApi();
        setIsLoading((prev: any) => ({ ...prev, button: false }));
      }
    } catch ({ response }) {
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, button: false }));
    }
  };

  return (
    <>
      <LoadingButton
        disableElevation
        loading={isLoading?.button}
        disabled={isLoading?.button}
        type="button"
        variant="contained"
        color="primary"
        onClick={handleSend}
      >
        {buttonText}
      </LoadingButton>
    </>
  );
};

export default SendEmailNow;