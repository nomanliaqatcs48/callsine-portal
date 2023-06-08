import React, { useEffect, useState } from "react";
import { devLogError } from "../../helpers/logs";
import {
  getPersonDetailService,
  updatePersonDetailService,
} from "../../services/persons.service";
import { useParams } from "react-router-dom";
import { generateResponsesService } from "../../services/prompts.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";

export const usePlaybook = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    regeneratePlaybook: false,
    resetPrompt: false,
  });

  useEffect(() => {
    getPersonDetail();
  }, [id]);

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

  const regeneratePlaybook = async (promptItem: any) => {
    setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: true }));
    try {
      let res = await generateResponsesService(
        Number(promptItem?.id),
        Number(id)
      );
      if (res?.data) {
        ToastSuccess("Message successfully regenerated.");
        let _prompts = data.prompts.map((item: any) => {
          if (item?.id === promptItem?.id) {
            item = res?.data;
          }
          setData((prev: any) => {
            let prompts = _prompts;
            return { ...prev, prompts };
          });
          return item;
        });
        setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
      }
    } catch ({ response }) {
      ToastError("Something went wrong!");
      devLogError(response);
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
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
  };
};
