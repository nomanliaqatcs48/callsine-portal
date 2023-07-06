// useFetchProspectSequenceEvent.ts
import { useState, useEffect } from "react";
import { getProspectSequenceEventService } from "../../services/sequences.service";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";

export const useFetchProspectSequenceEvent = (
  personId: string,
  filters: any,
  searchValue: string = ""
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>({
    onPage: true,
    regeneratePlaybook: false,
    resetPrompt: false,
    search: false,
  });
  const [error, setError] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: any, reason: any) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    insertBodyLoader();
    getProspectSequenceEventService(personId, filters, searchValue)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        removeBodyLoader();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        removeBodyLoader();
      });
  }, [personId]);

  const getPersonDetail = () => {
    setLoading(true);
    insertBodyLoader();
    getProspectSequenceEventService(personId, filters, searchValue)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        removeBodyLoader();
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        removeBodyLoader();
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
