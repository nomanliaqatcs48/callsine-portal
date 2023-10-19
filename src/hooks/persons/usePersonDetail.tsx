import React, { useEffect, useState, useCallback } from "react";
import { getPersonDetailService } from "../../services/persons.service";
import { devLogError } from "../../helpers/logs";
import { useParams } from "react-router-dom";

export const usePersonDetail = (load: boolean = true) => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  // Using useCallback to memorize the function to prevent unnecessary re-renders.
  const getPersonDetail = useCallback(async () => {
    try {
      const res = await getPersonDetailService(Number(id));
      if (res?.data) {
        setData(res.data);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  }, [id]);

  useEffect(() => {
    if (load) {
      getPersonDetail();
    }
  }, [load, getPersonDetail]);

  return {
    id,
    data,
    setData,
    isLoading,
    setIsLoading,
    getPersonDetail,
  };
};
