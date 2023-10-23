import { EmailDraftTypes, ThreadReplyTypes } from "src/utils/types/mail";
import http from "./axios";
import { endpoints } from "./endpoints";

export const getEmailsService = async (
  personId: number,
  filters: any,
  searchValue: string
) => {
  return await http.get(
    `${endpoints.EMAILS}?person=${personId}&limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};

export const getEmailDetailService = async (id: number, personId: number) => {
  return await http.get(`${endpoints.EMAILS}${id}/?person=${personId}`);
};

export const createEmailService = async (personId: number, data: any) => {
  return await http.post(`${endpoints.EMAILS}?person=${personId}`, data);
};

export const updateEmailService = async (
  personId: number,
  id: number,
  data: any
) => {
  return await http.put(`${endpoints.EMAILS}${id}/?person=${personId}`, data);
};

export const updateScheduleService = async (mailId: number, data: any) => {
  return await http.patch(
    `${endpoints.EMAILS}${mailId}/update-scheduled-time/`,
    data
  );
};

export const deleteEmailService = async (personId: number, id: number) => {
  return await http.delete(`${endpoints.EMAILS}${id}/?person=${personId}`);
};

export const createAsEmailService = async (data: any) => {
  return await http.post(`${endpoints.EMAILS}`, data);
};

export const sendEmailService = async (emailId: number, position: number) => {
  return await http.post(`${endpoints.EMAILS}${emailId}/send/`);
};

export const sendMailOauthService = async (data: EmailDraftTypes) => {
  return await http.post(`${endpoints.SENDMAIL}`, data);
};

export const emailThreadsService = async (person_id?: number) => {
  let url = endpoints.EMAILS_THREAD;
  if (person_id !== undefined) {
    url += `?person_id=${person_id}`;
  }
  return await http.get(url);
};

export const gmailThreadService = async (
  threadId: string | number,
  mailAccountId: number
) => {
  return await http.get(
    `${endpoints.GMAIL_THREAD}?thread_id=${threadId}&mail_account_id=${mailAccountId}`
  );
};
export const outlookThreadService = async (
  threadId: string | number,
  mailAccountId: number
) => {
  return await http.get(
    `${endpoints.OUTLOOK_THREAD}?thread_id=${threadId}&mail_account_id=${mailAccountId}`
  );
};

export const gmailThreadReplyService = async (data: ThreadReplyTypes) => {
  return await http.post(`${endpoints.GMAIL_THREAD}`, data);
};

export const outLookThreadReplyService = async (data: ThreadReplyTypes) => {
  return await http.post(`${endpoints.OUTLOOK_THREAD}`, data);
};

export const getUnreadRepliesService = async () => {
  return await http.get(`${endpoints.UNREAD_REPLIES}`);
};
