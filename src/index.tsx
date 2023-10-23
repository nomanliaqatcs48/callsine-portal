import React from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/500.css";
import "@fontsource/roboto";
import "@fontsource/inter";

import "./assets/styles/main.scss";
import "./index.css";
import "./globals.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import config from "./config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Microsoft provider
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "src/views/authentication/auth-forms/microsoft/authConfig";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Redux actions
import { getUnreadReplies } from "./store/emailReplyCount/actions";

// store.dispatch(getUnreadReplies());
const msalInstance = new PublicClientApplication(msalConfig as any);

const queryClient = new QueryClient();

const container: any = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
          <BrowserRouter basename={config.basename}>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </MsalProvider>
      </Provider>
    </QueryClientProvider>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
