import { useCallback, useEffect, useState } from "react";
import { devLogError, devLog } from "../../helpers/logs";
import { emailThreadsService } from "../../services/emails.service";
import { useParams } from "react-router-dom";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import { EmailThread } from "src/types/inbox";
import { useUnreadCount } from "../useUnreadCount";

export const useEmailThread = (
  load: boolean = true,
  _filters: any = {
    limit: 10,
    offset: 0,
  }
) => {
  const { id } = useParams();
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = useState<any>(_filters);
  const [isLoading, setIsLoading] = useState({
    onPage: true,
    cards: false,
  });

  const { unreadEmails } = useUnreadCount();

  const makePeopleWithReplyToTop = (persons: any) => {
    const _unreadEmails = new Set(unreadEmails.map((item: any) => item.to));
    persons.sort((a: any, b: any) => {
      const isAUnread = _unreadEmails.has(a.recipient);
      const isBUnread = _unreadEmails.has(b.recipient);

      if (isAUnread && !isBUnread) {
        return -1; // a comes first
      }
      if (!isAUnread && isBUnread) {
        return 1; // b comes first
      }
      return 0; // no change in order
    });
    console.log({ persons });
    return persons;
  };

  const getEmailThread = useCallback(async () => {
    let res: any;
    setIsLoading((prev: any) => ({ ...prev, cards: false }));
    insertBodyLoader();

    try {
      if (id) {
        res = await emailThreadsService(Number(id));
      } else {
        res = await emailThreadsService();
      }

      if (res?.data) {
        devLog(() => {
          console.log(res.data);
        });

        setEmailThreads(makePeopleWithReplyToTop(res.data));
        setIsLoading((prev: any) => ({ ...prev, onPage: false, cards: false }));
        removeBodyLoader();
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false, cards: false }));
      removeBodyLoader();
    }
  }, [load]);

  useEffect(() => {
    if (load) {
      getEmailThread();
    }
  }, [load, getEmailThread]);

  const showStatus = (status: number) => {
    if (status === 0) {
      return "Sent";
    } else if (status === 1) {
      return "Failed";
    } else if (status === 2) {
      return "Queued";
    } else if (status === 3) {
      return "Requeued";
    }

    return "";
  };

  return {
    id,
    emailThreads,
    setEmailThreads,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getEmailThread,
    showStatus,
  };
};
