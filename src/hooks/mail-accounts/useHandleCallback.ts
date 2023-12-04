import { useEffect } from "react";
import { useAuth } from "src/contexts/auth";
import Save from "src/views/mail-accounts/save";

import config from "src/config";
import { ToastSuccess, ToastError } from "src/helpers/toast";
// import { useMailAccounts } from "./useMailAccounts";

function handleMissingScopes(missingScopes: string[]) {
  const scopeMessages: { [key: string]: string } = {
    "https://www.googleapis.com/auth/gmail.send":
      "You did not authorize Callsine to send email on your behalf.",
    "https://www.googleapis.com/auth/gmail.readonly":
      "You did not authorize Callsine to view your email messages.",
  };

  let messages: string[] = [];

  missingScopes.forEach((scope) => {
    if (scopeMessages[scope]) {
      const message =
        scopeMessages[scope] +
        " Please try again and click the box that corresponds to this authorization.";
      ToastError(message, 5000);
      messages.push(message);
    }
  });
  return messages;
}

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

          const data = await response.json();

          if (state === "google") {
            const missingScopes = data?.missing_scopes;
            if (missingScopes && missingScopes.length > 0) {
              const messages = handleMissingScopes(missingScopes);
              const errorMessage = messages.join("\n");
              throw new Error(errorMessage);
            }
          }

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

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
        }
      }
    };

    callbackService();
  });
}

export default useHandleCallback;
