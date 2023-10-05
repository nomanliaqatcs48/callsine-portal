import React, { useEffect, useState } from "react";
import { devLog, devLogError } from "../../helpers/logs";
import {
  getPersonDetailService,
  updatePersonDetailService,
} from "../../services/persons.service";
import { useParams } from "react-router-dom";
import { generateResponsesService } from "../../services/prompts.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import { updateProspectSequenceEventDetailService } from "../../services/sequences.service";
import { updateEmailService } from "../../services/emails.service";

export const usePlaybook = (load: boolean = true) => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [showDraft, setShowDraft] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    regeneratePlaybook: false,
    resetPrompt: false,
  });

  useEffect(() => {
    if (load) {
      getPersonDetail();
    }
  }, [load, id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPersonDetail = async () => {
    try {
      let res = await getPersonDetailService(Number(id));
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
  };

  const onEditPlaybookSubmit = async (data: any) => {
    let _data: any = { playbook: { pitch: data?.pitch } };

    try {
      let res = await updatePersonDetailService(Number(id), _data);
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
    }
  };

  const regeneratePlaybook = async (sequenceEvent: any, onLoadApi: any) => {
    setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: true }));
    insertBodyLoader();
    try {
      let res = await generateResponsesService(Number(sequenceEvent?.id));
      if (res?.data) {
        ToastSuccess("Email successfully regenerated.");
        let _prompts = data.prompts.map((item: any) => {
          if (item?.id === sequenceEvent?.id) {
            item = res?.data;
          }
          setData((prev: any) => {
            let prompts = _prompts;
            return { ...prev, prompts };
          });
          return item;
        });
        setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
        removeBodyLoader();
        onLoadApi();
        return;
      }
    } catch (e: any) {
      // ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
      removeBodyLoader();
      onLoadApi();
    }
  };

  const updateProspectSequenceEvent = async (
    personId: number,
    id: any,
    data: any,
    onLoadApi: any
  ) => {
    insertBodyLoader();
    try {
      let response = await updateEmailService(personId, id, data);
      if (response?.data) {
        devLog(() => {
          console.log("response", response?.data);
        });
        setTimeout(() => {
          onLoadApi();
          removeBodyLoader();
          ToastSuccess("Prospect sequence event successfully updated.");
        });
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
      setTimeout(() => {
        removeBodyLoader();
        ToastSuccess("Something went wrong.");
      });
    }
  };

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    getPersonDetail,
    open,
    setOpen,
    handleOpen,
    handleClose,
    regeneratePlaybook,
    showDraft,
    setShowDraft,
    updateProspectSequenceEvent,
  };
};
