import { Dispatch } from "redux";
import {
  GET_UNREAD_REPLIES,
  GET_UNREAD_REPLIES_SUCCESS,
  GET_UNREAD_REPLIES_FAILURE,
  EmailReplyCountActionTypes,
} from "./types";
import { getUnreadRepliesService } from "src/services/emails.service";

export const getUnreadReplies =
  () => async (dispatch: Dispatch<EmailReplyCountActionTypes>) => {
    dispatch({ type: GET_UNREAD_REPLIES });

    try {
      const { data } = await getUnreadRepliesService();

      dispatch({
        type: GET_UNREAD_REPLIES_SUCCESS,
        payload: data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({
          type: GET_UNREAD_REPLIES_FAILURE,
          payload: error.message,
        });
      } else {
        dispatch({
          type: GET_UNREAD_REPLIES_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };
