import { useSelector } from "react-redux";

type UnreadReplyType = {
  count: number;
  emails: any;
};

export const useUnreadCount = (): any => {
  const unreadReplies = useSelector(
    (state: { emailReplyCount: { data: UnreadReplyType } }) =>
      state.emailReplyCount.data
  );
  console.log({ unreadReplies });

  const unreadCount = unreadReplies ? unreadReplies.count : 0;

  const unreadEmails = unreadReplies ? unreadReplies.emails : [];

  return { unreadCount, unreadEmails };
};
