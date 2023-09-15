import config from "src/config";
import OutlookIcon from "./OutlookIcon";

const MicrosoftAddEmailAccount = () => {
  const CLIENT_ID = config.microsoftClientId;
  const state = "54321";
  const REDIRECT_URI = config.microsoftRedirectUri;
  const SCOPE =
    "User.Read+email+offline_access+openid+profile+Mail.ReadWrite+Mail.ReadWrite.Shared+Contacts.ReadWrite+Mail.Send";
  const MS_AUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=${SCOPE}&state=${state}&prompt=consent`;

  return (
    <div>
      <a href={MS_AUTH_URL}>
        <OutlookIcon />
        <div className="tw-text-center">Outlook</div>
      </a>
    </div>
  );
};

export default MicrosoftAddEmailAccount;
