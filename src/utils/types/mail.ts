export type MailAccount = {
  connected: boolean;
  email: string;
  first_name: string;
  id: number;
  label: string;
  last_name: string;
  provider: "outlook" | "google";
  user: number;
  value: number;
  signature?: string;
  password?: string;
};
export type EmailDraftTypes = {
  from_email: MailAccount;
  html_message: string;
  subject: string;
  to: string;
  person: number;
  in_reply_to?: string;
  parent_email_html_message?: string;
  scheduled_time?: string;
  signature?: string;
};

export type ThreadReplyTypes = {
  mail_object: any;
  html_message: string;
  thread_id: string | number;
};
