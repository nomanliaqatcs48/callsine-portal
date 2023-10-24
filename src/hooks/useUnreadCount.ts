import { useSelector, useDispatch } from "react-redux";
import { decrementUnreadCountAction } from "src/store/emailReplyCount/actions";

type UnreadReplyType = {
  count: number;
  emails: any;
};

export const useUnreadCount = (): any => {
  const dispatch = useDispatch();

  const unreadReplies = useSelector(
    (state: { emailReplyCount: { data: UnreadReplyType } }) =>
      state.emailReplyCount.data
  );
  console.log({ unreadReplies });

  const unreadCount = unreadReplies ? unreadReplies.count : 0;

  const unreadEmails = unreadReplies ? unreadReplies.emails : [];

  const decrementUnreadCount = () => {
    const newCount = Math.max(unreadCount - 1, 0);
    dispatch(decrementUnreadCountAction(newCount));
  };

  return { unreadCount, unreadEmails, decrementUnreadCount };
};
