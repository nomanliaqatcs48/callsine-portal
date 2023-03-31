import React, { useEffect, useState } from "react";
import { devLogError } from "../../helpers/logs";
import {
  getPersonDetailService,
  updatePersonDetailService,
} from "../../services/persons.service";
import { useParams } from "react-router-dom";

export const usePlaybook = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    regeneratePlaybook: false,
    resetPrompt: false,
  });

  useEffect(() => {
    getPersonDetail();
  }, [id]);

  const getPersonDetail = async () => {
    try {
      let res = await getPersonDetailService(Number(id));
      if (res?.data) {
        setData(res.data);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(e.response);
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const onEditPlaybookSubmit = async (data: any) => {
    let _data: any = { playbook: { pitch: data?.pitch } };

    try {
      let res = await updatePersonDetailService(Number(id), _data);
    } catch ({ response }) {
      devLogError(response);
    }
  };

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    getPersonDetail,
  };
};
