import {
  googleAuthService,
  microsoftAuthService,
} from "src/services/auth.service";
import { devLog, devLogError } from "src/helpers/logs";

type TokenData = {
  access_token: string;
  refresh_token: string;
};

const Save = async (
  { access_token, refresh_token }: TokenData,
  email: string,
  code: string,
  state: string
) => {
  try {
    const payload = {
      access_token,
      action: "add-mail-account",
      owner_email: email,
      refresh_token,
      code,
    };
    devLog(() => {
      console.log({ payload });
    });

    let res: any;
    if (state === "google") {
      res = await googleAuthService(payload);
    } else {
      res = await microsoftAuthService(payload);
    }

    if (res?.data) {
      devLog(() => {
        console.log({ res });
      });
      return res.data;
    }
  } catch (err: any) {
    devLogError(() => {
      console.error(err?.response);
    });
    return err?.response;
  }
};

export default Save;
