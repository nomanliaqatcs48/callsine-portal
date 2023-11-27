import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { insertBodyLoader, removeBodyLoader } from "../../helpers/loaders";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import {
  createDraftEmailService,
  updateEmailService,
} from "../../services/emails.service";
import {
  getPersonDetailService,
  updatePersonDetailService,
} from "../../services/persons.service";
import { generateResponsesService } from "../../services/prompts.service";

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
        ToastSuccess("Emails are regenerating!");
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
    console.log("HEREEE");
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
        ToastError("Something went wrong.");
      });
    }
  };

  const createEmailObjectPartially = async (
    selectedSequenceEvent: any,
    data: any,
    onLoadApi: any
  ) => {
    insertBodyLoader();
    try {
      let response = await createDraftEmailService(selectedSequenceEvent, data);

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
    createEmailObjectPartially,
  };
};
