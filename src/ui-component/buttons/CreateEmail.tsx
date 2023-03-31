import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MyEditor from "../editor/MyEditor";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
} from "@mui/material";
import xss from "xss";
import { gridSpacing } from "../../store/constant";
import { ErrorMessage } from "@hookform/error-message";
import { devLog } from "../../helpers/logs";

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
    form: false,
  });
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("html_message");
    setValue("html_message", html_message);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleMyEditorOnChange = (value: string, editor: any) => {
    setValue("html_message", value);
    handleEditorPreview(value);
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
    devLog("onSubmit data", data);
  };

  return (
    <>
      <Button type="button" onClick={handleOpen} {...props}>
        {buttonText}
      </Button>

      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          fullWidth={true}
          maxWidth="xl"
          aria-labelledby="Send as Email"
          aria-describedby="Send as Email"
        >
          <DialogTitle variant="h4">Send as Email</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <MyEditor
                      initialValue={getValues("html_message")}
                      onEditorChange={(value: string, editor: any) => {
                        handleMyEditorOnChange(value, editor);
                      }}
                      isPreformatted={true}
                      onFocus={(e: any) => null}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="html_message"
                      render={({ message }) => (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {message}
                        </FormHelperText>
                      )}
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={isLoading?.form}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit((data) => onSubmit(data))}
              disabled={isLoading?.form}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateEmail;
