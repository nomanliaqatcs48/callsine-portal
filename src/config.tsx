let env = process.env;
const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "",
  defaultPath: "/",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  service: {
    BASE_URL: env.REACT_APP_SERVICE_BASE_URL,
  },
  node_env: env.NODE_ENV,
};

export default config;
