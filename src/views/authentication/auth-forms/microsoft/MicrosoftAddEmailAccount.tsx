import config from "src/config";
import OutlookIcon from "./OutlookIcon";
import { useState } from "react";
import MicrosoftDialogWalkthrough from "./MicrosoftDialogWalkthrough";

const MicrosoftAddEmailAccount = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (event: any) => {
    event.stopPropagation(); // This will prevent the event from propagating further
    console.log("Seting to false");
    setOpen(false);
  };

  const CLIENT_ID = config.microsoftClientId;
  const state = "54321";
  const REDIRECT_URI = config.microsoftRedirectUri;
  // &prompt=consent
  const SCOPE =
    "User.Read+email+offline_access+openid+profile+Mail.ReadWrite+Mail.ReadWrite.Shared+Contacts.ReadWrite+Mail.Send";
  const MS_AUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=${SCOPE}&state=${state}&prompt=consent`;

  return (
    <div
      className="hover:tw-cursor-pointer hover:tw-underline"
      onClick={() => {
        handleOpen();
      }}
    >
      <OutlookIcon />
      <MicrosoftDialogWalkthrough
        open={open}
        handleClose={handleClose}
        MS_AUTH_URL={MS_AUTH_URL}
      />
      <div className="tw-text-center ">Outlook</div>
    </div>
  );
};

export default MicrosoftAddEmailAccount;
