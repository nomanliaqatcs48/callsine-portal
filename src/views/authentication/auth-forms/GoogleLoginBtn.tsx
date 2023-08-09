import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import config from "src/config";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuthService } from "src/services/auth.service";
import { devLog, devLogError } from "src/helpers/logs";
import { save, saveString } from "src/utils/storage";

const GoogleLoginBtn = () => {
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
      if (res?.data) {
        await saveString("isAuthenticated", "yes");
        await saveString("token", res.data.access_token);
        await saveString("refresh", res.data.refresh_token);
        await save("profile", res.data.user);
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      devLogError(() => {
        console.error(err?.response);
      });
    }
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        render={(renderProps) => <GoogleButton {...renderProps} />}
        clientId={config.googleClientId as string}
        buttonText="Sign in with Google"
        onSuccess={handleOnSuccess}
        onFailure={({ details }) => {
          console.log(details);
          // notifyError(details);
        }}
      />
    </div>
  );
};

export default GoogleLoginBtn;
