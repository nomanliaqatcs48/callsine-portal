import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import config from "src/config";
import { googleAuthService } from "src/services/auth.service";
import { devLog, devLogError } from "src/helpers/logs";
import { save, saveString } from "src/utils/storage";

const GoogleLoginBtn = () => {
  const handleOnSuccess = async (response: any) => {
    devLog(() => {
      console.log({ response });
    });

    try {
      const payload = { access_token: response.tokenId };
      console.log("Token ID", response.tokenId);
      let res = await googleAuthService(payload);

      debugger;
      devLog(() => {
        console.log("res", res);
      });
      if (res?.data) {
        await saveString("isAuthenticated", "yes");
        await saveString("token", res.data.access_token);
        await saveString("refresh", res.data.refresh_token);
        await save("profile", res.data.user);
        window.location.href = "/people";
      }
    } catch (err: any) {
      devLogError(() => {
        console.error(err?.response);
      });

      setTimeout(() => console.log("This will run after 1 second"), 60);
    }
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        render={(renderProps) => (
          <GoogleButton
            {...renderProps}
            className="google-button-wrapper tw-text-[16px] lg:tw-text-[18px] tw-w-full tw-font-normal tw-justify-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              width: "100%",
              backgroundColor: "transparent",
              color: "#000000",
              display: "flex",
              justifyContent: "center",
              boxShadow: "none",
              border: "1px solid #e7e7e9",
              height: 51,
              borderRadius: 8,
            }}
          />
        )}
        clientId={config.googleClientId as string}
        buttonText="Sign in with Google"
        onSuccess={handleOnSuccess}
        onFailure={({ details }) => {
          console.log(details);
        }}
      />
    </div>
  );
};

export default GoogleLoginBtn;
