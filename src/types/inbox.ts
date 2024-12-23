export interface Thread {
  clicks: number;
  context: string | null;
  created_by: number;
  createdDateTime: string;
  receivedDateTime: string;
  sentDateTime: string;
  draft_id: string;
  failed_reason: string | null;
  from_email: number;
  from: any;
  headers: string | null;
  html_message: string;
  id: number;
  in_reply_to: number | null;
  message: string | null;
  message_id: string | null;
  modified_by: number | null;
  modified_date: string;
  opens: number;
  position: number;
  provider: string;
  scheduled_time: string | null;
  status: string | null;
  subject: string;
  thread_id: string;
  to: string;
  avatar: string;
  body?: string;
  person_id?: number;
  reply_count: ReplyCount;
}

type ReplyCount = {
  id: number;
  count: number;
  is_viewed: boolean;
};

export interface EmailThread {
  count: number;
  emails: Thread[] | null;
  recipient: string;
  recipient_name: string;
}
