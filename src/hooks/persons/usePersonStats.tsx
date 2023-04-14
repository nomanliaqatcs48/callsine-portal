import React, { useEffect, useState } from "react";
import { getPersonDetailStatService } from "../../services/persons.service";
import { devLogError } from "../../helpers/logs";
import { useParams } from "react-router-dom";

export const usePersonStats = (load: boolean = true) => {
  const { id } = useParams();
  const [personStatData, setPersonStatData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  useEffect(() => {
    if (load) {
      getPersonDetailStat();
    }
  }, [load]);

  const getPersonDetailStat = async () => {
    try {
      let res = await getPersonDetailStatService(Number(id));
      if (res?.data) {
        setPersonStatData(res.data);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(e.response);
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  return {
    id,
    personStatData,
    setPersonStatData,
    isLoading,
    setIsLoading,
    getPersonDetailStat,
  };
};
