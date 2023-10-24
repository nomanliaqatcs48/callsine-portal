import {
  GET_UNREAD_REPLIES,
  GET_UNREAD_REPLIES_SUCCESS,
  GET_UNREAD_REPLIES_FAILURE,
  DECREMENT_UNREAD_COUNT,
  EmailReplyCountState,
  EmailReplyCountActionTypes,
} from "./types";

const initialState: EmailReplyCountState = {
  loading: false,
  data: null,
  error: null,
};

export const emailReplyCountReducer = (
  state = initialState,
  action: EmailReplyCountActionTypes
): EmailReplyCountState => {
  switch (action.type) {
    case GET_UNREAD_REPLIES:
      return { ...state, loading: true };
    case GET_UNREAD_REPLIES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_UNREAD_REPLIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DECREMENT_UNREAD_COUNT:
      return {
        ...state,
        data: {
          ...state.data,
          count: Math.max(0, (state.data?.count ?? 0) - 1), // Decrement by 1, minimum 0
        },
      };
    default:
      return state;
  }
};
