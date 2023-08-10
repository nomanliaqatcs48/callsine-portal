import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import config from "src/config";
import { googleAuthService } from "src/services/auth.service";
import { devLog, devLogError } from "src/helpers/logs";
import { save, saveString } from "src/utils/storage";
import { useEffect } from "react";

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
  const isSmallScreen = window.innerWidth <= 600;
  const isMedium =
    window.innerWidth <= 1024 &&
    window.innerWidth >= 600 &&
    window.innerWidth <= 1660;

  return (
    <div id="signInButton">
      <GoogleLogin
        render={(renderProps) => (
          <GoogleButton
            {...renderProps}
            style={
              isSmallScreen
                ? { width: "366px", fontSize: "18px" }
                : isMedium
                ? { width: "350px", fontSize: "18px" }
                : { width: "395px", fontSize: "18px" }
            }
          />
        )}
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
