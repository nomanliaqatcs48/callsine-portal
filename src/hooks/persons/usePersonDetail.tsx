import React, { useEffect, useState } from "react";
import { getPersonDetailService } from "../../services/persons.service";
import { devLogError } from "../../helpers/logs";
import { useParams } from "react-router-dom";

export const usePersonDetail = (load: boolean = false) => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  useEffect(() => {
    if (load) {
      getPersonDetail();
    }
  }, []);

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

  return {
    id,
    data,
    setData,
    isLoading,
    setIsLoading,
    getPersonDetail,
  };
};
