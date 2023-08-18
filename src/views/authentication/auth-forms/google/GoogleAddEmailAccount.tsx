import config from "src/config";

const MicrosoftAddEmailAccount = () => {
  const client_id = config.googleClientId;
  const redirect_uri = config.microsoftRedirectUri;
  const scope =
    "https://www.googleapis.com/auth/gmail.send openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile ";
  const response_type = "code";
  const access_type = "offline";
  const state = "google";
  const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}&access_type=${access_type}&prompt=consent`;

  return (
    <a href={authURL}>
      <br></br>Login with Google
    </a>
  );
};

export default MicrosoftAddEmailAccount;
