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
    getAllCampaignSteps();
  }, []);

  const getAllCampaignSteps = async () => {
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
    getAllCampaignSteps,
  };
};
