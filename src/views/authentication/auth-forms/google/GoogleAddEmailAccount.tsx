import config from "src/config";
import GmailIcon from "./GmailIcon";
import { useState } from "react";
import GoogleDialogWarning from "./GoogleDialogWarning";
const GoogleAddEmailAccount = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (event: any) => {
    event.stopPropagation(); // This will prevent the event from propagating further
    console.log("Seting to false");
    setOpen(false);
  };

  const client_id = config.googleClientId;
  const redirect_uri = config.microsoftRedirectUri;
  const scope = `https://www.googleapis.com/auth/gmail.send 
    https://www.googleapis.com/auth/gmail.readonly 
    openid 
    https://www.googleapis.com/auth/userinfo.email
    https://www.googleapis.com/auth/userinfo.profile 
    `;
  const response_type = "code";
  const access_type = "offline";
  const state = "google";
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}&access_type=${access_type}&prompt=consent`;

  return (
    <div
      className="hover:tw-cursor-pointer hover:tw-underline"
      onClick={() => {
        handleOpen();
      }}
    >
      <GmailIcon />
      <GoogleDialogWarning
        open={open}
        handleClose={handleClose}
        GOOGLE_AUTH_URL={GOOGLE_AUTH_URL}
      />
      <div className="tw-text-center ">Gmail</div>
    </div>
  );
};

export default GoogleAddEmailAccount;
