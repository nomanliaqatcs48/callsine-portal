import { useEffect, useRef } from "react";

export interface EmailContainerProps {
  htmlEmailContent: string;
}

export const EmailContainer: React.FC<EmailContainerProps> = ({
  htmlEmailContent,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      const shadowRoot = divRef.current.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `<div >${htmlEmailContent}</div>`;
    }
  }, [htmlEmailContent]);

  return <div ref={divRef}></div>;
};

export const cleanBody = (html_body: any) => {
  const match = html_body.match(/<body[^>]*>([\w|\W]*)<\/body>/im);
  let body;
  if (match && match[1]) {
    html_body = match[1];
  }
  console.log(body);

  body = removeAfterFrom(html_body);
  body = removeTrackingPixel(body);
  body = removeClickTracking(body);
  body = removeHR(body);
  return body;
};
const removeHR = (html: string): string => {
  const regex = /<hr tabindex="-1" style="display:inline-block; width:98%">/g;
  return html.replace(regex, "");
};
const removeTrackingPixel = (html: string) => {
  const regex = /src="https:\/\/api\.callsine\.com\/track\/\d+\//g;
  return html.replace(regex, "");
};

const removeClickTracking = (html: string) => {
  const regex = /http.*:\/\/api\.callsine\.com\/track_click\/\d+/g;
  return html.replace(regex, "");
};
const removeAfterFrom = (str: string) => {
  const index = str.indexOf("From:");
  if (index !== -1) {
    return str.substring(0, index);
  }
  return str;
};
