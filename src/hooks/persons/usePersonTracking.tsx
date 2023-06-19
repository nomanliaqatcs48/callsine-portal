import React, { useEffect, useState } from "react";
import { getPersonDetailTrackingService } from "../../services/persons.service";
import { devLogError } from "../../helpers/logs";
import { useParams } from "react-router-dom";

export const usePersonTracking = (load: boolean = true) => {
  const { id } = useParams();
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  useEffect(() => {
    if (load) {
      getPersonDetailTracking();
    }
  }, [load]);

  const getPersonDetailTracking = async () => {
    try {
      let res = await getPersonDetailTrackingService(Number(id));
      if (res?.data) {
        setTrackingData(res.data);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e.response);
      });
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  return {
    id,
    trackingData,
    setTrackingData,
    isLoading,
    setIsLoading,
    getPersonDetailTracking,
  };
};
