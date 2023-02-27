import React from "react";
import {
  Box,
  Button,
  DialogActions,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MyModal from "../../../../ui-component/modal/MyModal";
import { gridSpacing } from "../../../../store/constant";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const useAddStepModal = () => {
  const [addStepOpen, setAddStepOpen] = React.useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log("errors", errors);

  const handleAddStepClickOpen = () => {
    setAddStepOpen(true);
    reset();
  };

  const handleAddStepClose = () => {
    setAddStepOpen(false);
  };

  const onSubmit = async (data: any) => {
    alert(JSON.stringify(errors));
    alert(JSON.stringify(data));
  };

  const renderAddStepModal = () => {
    return (
      <MyModal
        open={addStepOpen}
        onClose={handleAddStepClose}
        modalTitle="Add Step"
        labelledby="Add Step"
        describedby="add step modal"
        modalSxStyle={{
          width: {
            xs: 300,
            sm: 600,
            md: 800,
            lg: 900,
            xl: 1200,
          },
        }}
      >
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
              <div>This is for email content (CKEditor)</div>
            </Box>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Grid>
              <Typography>Preview</Typography>
              <Grid className="preview-wrapper" />
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleAddStepClose}>Cancel</Button>
          <Button onClick={handleSubmit((data) => onSubmit(data))}>
            Create
          </Button>
        </DialogActions>
      </MyModal>
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
