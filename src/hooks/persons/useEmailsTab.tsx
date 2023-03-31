import React, { useEffect, useState } from "react";
import { devLogError } from "../../helpers/logs";
import { getEmailsService } from "../../services/emails.service";
import { useParams } from "react-router-dom";

export const useEmailsTab = () => {
  const { id } = useParams();
  const [emails, setEmails] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = useState<any>({
    limit: 9999,
    offset: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState({
    onPage: true,
    cards: false,
  });

  useEffect(() => {
    getEmails();
  }, []);

  const getEmails = async () => {
    setIsLoading((prev: any) => ({ ...prev, cards: false }));

    try {
      let res = await getEmailsService(Number(id), filters, searchValue);
      if (res?.data) {
        setEmails(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false, cards: false }));
      }
    } catch ({ response }) {
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, onPage: false, cards: false }));
    }
  };

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
    emails,
    setEmails,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getEmails,
    showStatus,
  };
};
