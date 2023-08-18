let env = process.env;
const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "",
  defaultPath: "/login",
  fontFamily: `'Poppins', sans-serif!important`,
  borderRadius: 12,
  service: {
    BASE_URL: env.REACT_APP_SERVICE_BASE_URL,
  },
  node_env: env.NODE_ENV,
  googleClientId: env.REACT_APP_GOOGLE_CLIENT_ID,
  googleClientSecret: env.REACT_APP_GOOGLE_CLIENT_SECRET,
  googleCallback: env.REACT_APP_GOOGLE_CALLBACK,

  microsoftClientId: env.REACT_APP_MICROSOFT_CLIENT_ID,
  microsoftRedirectUri: env.REACT_APP_MICROSOFT_REDIRECTURI,
  microsofCallback: env.REACT_APP_MICROSOFT_CALLBACK,
  microsoftRedirectUriLogin: env.REACT_APP_MICROSOFT_REDIRECTURI_LOGIN,
};

export default config;
