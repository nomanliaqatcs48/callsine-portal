import { devLog } from "./logs";

type CleanBodyConfig = {
  breaklines?: boolean;
  links?: boolean;
};

export const cleanBody = (html_body: any, config?: CleanBodyConfig) => {
  const body_ = html_body.toString();

  let regex = /(<html><head>[\s\S]*<body>)([\s\S]*)(<\/body>[\s\S]*<\/html>)/g;

  let body = body_.replace(regex, "$2");

  if (config?.breaklines) {
    body = body.replace(/<div[^>]*>(.*?)<\/div>/gi, "$1");
    body = body.replace(/(<br>)/g, "\n");
  }

  if (config?.links) {
    body = body.replace(/<a[^>]*>(.*?)<\/a>/gi, "$1");
  }

  return body;
};
