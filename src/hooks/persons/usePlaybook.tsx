import React from "react";
import { Button, DialogActions } from "@mui/material";
import MyModal from "../../ui-component/modal/MyModal";
import MyEditor from "../../ui-component/editor/MyEditor";
import { useForm } from "react-hook-form";
import xss from "xss";
import { devLogError } from "../../helpers/logs";
import { updatePersonDetailService } from "../../services/persons.service";
import { useParams } from "react-router-dom";

export const usePlaybook = () => {
  const { id } = useParams();
  const [playbookOpen, setPlaybookOpen] = React.useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePlaybookOpen = () => {
    setPlaybookOpen(true);
  };

  const handlePlaybookClose = () => {
    setPlaybookOpen(false);
    reset();
  };

  const renderPlaybookModal = (data: any, key?: string | null) => {
    let _initValue = data?.playbook?.pitch;
    return (
      <MyModal
        open={playbookOpen}
        onClose={handlePlaybookClose}
        modalTitle="Edit Email"
        labelledby="Edit Email Modal"
        describedby="edit email modal"
        modalSxStyle={{ width: { xs: 400, sm: 500, md: 900 } }}
      >
        <MyEditor
          initialValue={_initValue}
          onEditorChange={(value: string, editor: any) => {
            handlePreview(value);
          }}
        />

        <DialogActions>
          <Button onClick={handlePlaybookClose}>Cancel</Button>
          <Button onClick={handleSubmit((data) => onEditPlaybookSubmit(data))}>
            Edit
          </Button>
        </DialogActions>
      </MyModal>
    );
  };

  const handlePreview = (data: any) => {
    let _preview: any = document.querySelector(".preview-wrapper");
    if (_preview) {
      if (data) {
        setTimeout(() => {
          _preview.innerHTML = xss(data);
        }, 500);
      } else {
        setTimeout(() => {
          _preview.innerHTML = "";
        }, 200);
      }
    }
  };

  const onEditPlaybookSubmit = async (data: any) => {
    let _data: any = { playbook: { pitch: data?.pitch } };

    try {
      let res = await updatePersonDetailService(Number(id), _data);
      if (res?.data) {
        handlePlaybookClose();
      }
    } catch ({ response }) {
      devLogError(response);
      handlePlaybookClose();
    }
  };

  return {
    playbookOpen,
    setPlaybookOpen,
    handlePlaybookOpen,
    handlePlaybookClose,
    renderPlaybookModal,
    handlePreview,
  };
};
