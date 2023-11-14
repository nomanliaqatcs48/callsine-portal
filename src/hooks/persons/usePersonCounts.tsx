import React, { useEffect, useState } from "react";
import { personCount, personForceEnable } from "../../services/persons.service";

export const usePersonCounts = () => {
  const [personCounts, setPersonCounts] = useState<Record<string, any>>({});

  const [isFetching, setIsFetching] = useState(false);

  const getPersonCounts = async () => {
    try {
      let res = await personCount();
      if (res.status === 200) {
        setPersonCounts(res.data);
        setIsFetching(false);
      }
    } catch (e) {
      setIsFetching(false);
      return null;
    }
  };

  useEffect(() => {
    getPersonCounts();
  }, []);

  return {
    getPersonCounts,
    personCounts,
    isFetching,
  };
};
