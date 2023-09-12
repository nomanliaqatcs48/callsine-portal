import config from "src/config";
import OutlookIcon from "./OutlookIcon";

const MicrosoftAddEmailAccount = () => {
  const CLIENT_ID = "80eb06f6-b235-4b45-9831-b7a3032157f8";
  const state = "54321";
  const REDIRECT_URI = config.microsoftRedirectUri;
  const SCOPE =
    "User.Read+email+offline_access+openid+profile+Mail.ReadWrite+Contacts.ReadWrite+Mail.Send";
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
