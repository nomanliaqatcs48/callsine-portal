export const DECREMENT_UNREAD_COUNT = "DECREMENT_UNREAD_COUNT";
export const GET_UNREAD_REPLIES = "GET_UNREAD_REPLIES";
export const GET_UNREAD_REPLIES_SUCCESS = "GET_UNREAD_REPLIES_SUCCESS";
export const GET_UNREAD_REPLIES_FAILURE = "GET_UNREAD_REPLIES_FAILURE";

export interface DecrementUnreadCountAction {
  type: typeof DECREMENT_UNREAD_COUNT;
}

export interface EmailReplyCountState {
  loading: boolean;
  data: any; // Replace with your data type
  error: string | null;
}

export interface GetUnreadRepliesAction {
  type: typeof GET_UNREAD_REPLIES;
}

export interface GetUnreadRepliesSuccessAction {
  type: typeof GET_UNREAD_REPLIES_SUCCESS;
  payload: any; // Replace with your data type
}

export interface GetUnreadRepliesFailureAction {
  type: typeof GET_UNREAD_REPLIES_FAILURE;
  payload: string;
}

export type EmailReplyCountActionTypes =
  | GetUnreadRepliesAction
  | GetUnreadRepliesSuccessAction
  | GetUnreadRepliesFailureAction
  | DecrementUnreadCountAction;
