import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { devLog, devLogError } from "src/helpers/logs";
import { microsoftAuthService } from "src/services/auth.service";
import { save, saveString } from "src/utils/storage";
import MicrosoftSignInIcon from "./MicrosoftSignInIcon";

const MicrosoftLoginBtn = () => {
  const { instance } = useMsal();
  const handleLogin = async () => {
    const res = instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
    const data: any = await res;
    devLog(() => {
      console.log({ data });
    });
    try {
      const payload = { access_token: data.accessToken };
      devLog(() => {
        console.log({ payload });
      });

      let res = await microsoftAuthService(payload);

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
    }
  };
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-white">
      <button
        className=" tw-bg-white tw-w-full tw-flex tw-justify-center tw-items-center tw-border tw-border-[#e7e7e9] tw-rounded-[8px] tw-shadow-none tw-pl-[1px]"
        onClick={handleLogin}
      >
        <div className="tw-flex tw-items-center tw-p-[0px] tw-scale-75">
          <MicrosoftSignInIcon />
        </div>
        <span className="text-center tw-text-[16px] lg:tw-text-[18px] tw-leading-[48px] tw-text-black tw-font-normal">
          Sign in with Microsoft
        </span>
        <div style={{ width: "10px" }}></div>
      </button>
    </div>
  );
};

export default MicrosoftLoginBtn;
