import React, { useEffect, useState } from "react";
import { devLogError } from "../../helpers/logs";
import { getEmailsService } from "../../services/emails.service";

export const useEmailsTab = () => {
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
    getAllCampaignSteps();
  }, []);

  const getAllCampaignSteps = async () => {
    setIsLoading((prev: any) => ({ ...prev, cards: false }));

    try {
      let res = await getEmailsService(filters, searchValue);
      if (res?.data) {
        setEmails(res.data?.results);
        setIsLoading((prev: any) => ({ ...prev, onPage: false, cards: false }));
      }
    } catch ({ response }) {
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, onPage: false, cards: false }));
    }
  };

  return {
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
    getAllCampaignSteps,
  };
};
