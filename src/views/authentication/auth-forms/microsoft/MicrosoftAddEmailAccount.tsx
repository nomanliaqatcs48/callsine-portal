import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import config from "src/config";
import { googleAuthService } from "src/services/auth.service";
import { devLog, devLogError } from "src/helpers/logs";
import { save, saveString } from "src/utils/storage";

const MicrosoftAddEmailAccount = () => {
  const handleOnSuccess = async (response: any) => {
    devLog(() => {
      console.log({ response });
    });

    try {
      const payload = { google_token: response.tokenId };

      let res = await googleAuthService(payload);
      devLog(() => {
        console.log("res", res);
      });
      // if (res?.data) {
      //   await saveString("isAuthenticated", "yes");
      //   await saveString("token", res.data.access_token);
      //   await saveString("refresh", res.data.refresh_token);
      //   await save("profile", res.data.user);
      //   window.location.href = "/dashboard";
      // }
    } catch (err: any) {
      devLogError(() => {
        console.error(err?.response);
      });
    }
  };

  const CLIENT_ID = "80eb06f6-b235-4b45-9831-b7a3032157f8";
  const state = "54321";
  const REDIRECT_URI = config.microsoftRedirectUri;
  const MS_AUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=openid+profile+email+offline_access+Mail.Send,&state=${state}`;

  return <a href={MS_AUTH_URL}>Login with Microsoft</a>;
};

export default MicrosoftAddEmailAccount;
