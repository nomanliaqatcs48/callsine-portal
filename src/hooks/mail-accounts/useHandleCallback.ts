import { useEffect } from "react";
import { useAuth } from "src/contexts/auth";
import Save from "src/views/mail-accounts/save";

import config from "src/config";
import { ToastSuccess, ToastError } from "src/helpers/toast";
// import { useMailAccounts } from "./useMailAccounts";

function useHandleCallback(getMailAccounts: any) {
  const { auth } = useAuth();
  useEffect(() => {
    const callbackService = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state") || "";

      if (code) {
        const redirect_uri = config.microsoftRedirectUri!;
        const urlWithoutParams =
          window.location.origin + window.location.pathname;
        window.history.pushState({}, "", urlWithoutParams);
        let serviceCallback = "";
        if (state === "google") {
          serviceCallback = config.googleCallback!;
        } else {
          serviceCallback = config.microsofCallback!;
        }

        try {
          const response = await fetch(serviceCallback, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              code,
            },
            body: JSON.stringify({ code: code, redirect_uri: redirect_uri }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log({ data });

          const _res = await Save(data, auth?.email, code, state);
          console.log({ _res });

          if (_res.status === 400) {
            const detail = _res.data.detail;
            const regex = /email\)=\((.+)/;
            const match = detail.match(regex);

            let desiredText = "";
            if (match && match[1]) {
              desiredText = match[1];
              console.log(`Desired text: ${desiredText}`);
              const cleanMsg = desiredText.replace(/[()]/g, "");
              ToastError(cleanMsg);
            } else {
              console.log("No email found.");
            }
          }

          ToastSuccess(_res.detail);
          getMailAccounts();
        } catch (error) {
          console.error("There was an error with the fetch operation:", error);
          ToastSuccess(`There was an error with the fetch operation: ${error}`);
        }
      }
    };

    callbackService();
  });
}

export default useHandleCallback;
