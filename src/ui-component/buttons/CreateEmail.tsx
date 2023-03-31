import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MyEditor from "../editor/MyEditor";
import { Button, DialogActions } from "@mui/material";
import MyModal from "../modal/MyModal";
import xss from "xss";

type CreateEmailTypes = {
  html_message: any;
  handleEditorPreview: any;
  buttonText: string;
  [x: string]: any;
};

const CreateEmail = ({
  html_message,
  handleEditorPreview,
  buttonText,
  ...props
}: CreateEmailTypes) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
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

  const onSubmit = async (data: any) => {
    //
  };

  return (
    <>
      <Button type="button" onClick={handleOpen} {...props}>
        {buttonText}
      </Button>

      {open && (
        <MyModal
          open={open}
          onClose={handleClose}
          modalTitle="Send as Email"
          labelledby="Send as Email Modal"
          describedby="send as email modal"
          modalSxStyle={{ width: { xs: 400, sm: 500, md: 900 } }}
        >
          <MyEditor
            initialValue={html_message}
            onEditorChange={(value: string, editor: any) => {
              handleEditorPreview(value);
            }}
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit((data) => onSubmit(data))}>
              Edit
            </Button>
          </DialogActions>
        </MyModal>
      )}
    </>
  );
};

export default CreateEmail;
