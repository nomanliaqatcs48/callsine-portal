import { devLog } from "./logs";

export const cleanBody = (html_body: any) => {
  const body_ = html_body.toString();
  let regex = /(<html><head>[\s\S]*<body>)([\s\S]*)(<\/body>[\s\S]*<\/html>)/g;
  let body = body_.replace(regex, "$2");
  devLog(() => console.log("cleanBody", body));
  return body;
};
