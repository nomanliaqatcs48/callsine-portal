import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MyModal from "../../../../ui-component/modal/MyModal";
import { gridSpacing } from "../../../../store/constant";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import MyEditor from "../../../../ui-component/editor/MyEditor";
import xss from "xss";

export const useAddStepModal = () => {
  const [addStepOpen, setAddStepOpen] = React.useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      register("sender_signature_block", {
        required: "This is required field.",
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddStepClickOpen = () => {
    setAddStepOpen(true);
    reset();
  };

  const handleAddStepClose = () => {
    setAddStepOpen(false);
  };

  const handleMyEditorOnChange = (value: string, editor: any) => {
    setValue("sender_signature_block", value);
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
    alert(JSON.stringify(errors));
    alert(JSON.stringify(data));
  };

  const renderAddStepModal = () => {
    return (
      <Dialog
        open={addStepOpen}
        onClose={handleAddStepClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h4">Add Step</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={gridSpacing}>
            <Grid item sm={7} xs={12}>
              column 1
              <Box component="form" noValidate autoComplete="off">
                <div>
                  <TextField
                    error={!!errors.day}
                    required
                    margin="dense"
                    id="day"
                    label="Day Number"
                    type="number"
                    fullWidth
                    defaultValue={1}
                    {...register("day", {
                      required: "This is required field.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="day"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </div>
                <div>
                  <TextField
                    error={!!errors.name}
                    required
                    margin="dense"
                    id="name"
                    label="Step Name"
                    type="text"
                    fullWidth
                    {...register("name", {
                      required: "This is required field.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </div>
                <div>
                  <TextField
                    error={!!errors.subject}
                    required
                    margin="dense"
                    id="subject"
                    label="Email Subject"
                    type="text"
                    fullWidth
                    {...register("subject", {
                      required: "This is required field.",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="subject"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </div>
                <div>
                  <MyEditor
                    initialValue=""
                    onEditorChange={(value: string, editor: any) => {
                      handleMyEditorOnChange(value, editor);
                      handlePreview(value);
                    }}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="sender_signature_block"
                    render={({ message }) => (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {message}
                      </FormHelperText>
                    )}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item sm={5} xs={12}>
              <Grid>
                <Typography>Preview</Typography>
                <Grid className="preview-wrapper" />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddStepClose}>Cancel</Button>
          <Button onClick={handleSubmit((data) => onSubmit(data))}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return {
    addStepOpen,
    setAddStepOpen,
    handleAddStepClickOpen,
    handleAddStepClose,
    renderAddStepModal,
  };
};
