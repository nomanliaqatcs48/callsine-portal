// useFetchProspectSequenceEvent.ts
import { useState, useEffect } from "react";
import { getProspectSequenceEventService } from "../../services/sequences.service";

export const useFetchProspectSequenceEvent = (personId: string) => {
  const [user, setUser] = useState<string>("lkelly@unionresolute.com");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>({
    onPage: true,
    regeneratePlaybook: false,
    resetPrompt: false,
  });
  const [error, setError] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setLoading(true);
    getProspectSequenceEventService(user, personId)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [user, personId]);

  const getPersonDetail = () => {
    setLoading(true);
    getProspectSequenceEventService(user, personId)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    data,
    loading,
    setData,
    setLoading,
    error,
    handleOpen,
    handleClose,
    getPersonDetail,

    open,
  };
};
