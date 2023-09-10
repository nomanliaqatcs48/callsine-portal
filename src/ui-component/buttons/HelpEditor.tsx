import { ChangeEvent, useState } from "react";
import { devLog, devLogError } from "src/helpers/logs";
import { ToastError, ToastSuccess } from "src/helpers/toast";
import { sendNewPrompt } from "src/services/persons.service";
import { SmallSpinner } from "../../helpers/loaders";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

type EditorPayloadTypes = {
  personInformation: any;
  draftText: string;
  sequenceEvent: string;
};

const actionHelpers = [
  "Make it shorter",
  "Make it longer",
  "User more detail",
  "Be friendlier",
  "Be more authoritative",
];

const HelpEditor = ({
  sequenceEvent,
  personInformation,
  draftText,
}: EditorPayloadTypes): any => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [textFieldValue, setTextFieldValue] = useState<string>();

  const [helpAction, setHelpAction] = useState<string>();
  devLog(() => {
    console.log({ helpAction });
  });
  const handleHelpChange = (
    _event: React.MouseEvent<HTMLElement>,
    _helpAction: string
  ) => {
    setHelpAction(_helpAction);

    setTextFieldValue("");
  };

  const handleOnclick = async () => {
    setOpenDialog(true);
  };
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHelpAction(e.target.value);
    setTextFieldValue(e.target.value);
  };

  const handleSubmit = async () => {
    ToastSuccess("Help is coming.");
    setLoading(true);
    setOpenDialog(false);
    const payload = {
      draftText,
      personInformation,
      helpAction,
      sequenceEvent,
    };

    try {
      let res = await sendNewPrompt(payload);
      if (res?.data) {
        ToastSuccess("Help is here.");
        alert(res.data?.message);
      }
      setLoading(false);
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e);
      });
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <div
        className={`tw-left-5 tw-bottom-[50px] tw-absolute tw-z-50  tw-rounded-lg tw-text-black tw-bg-slate-200 ${
          !loading && "hover:tw-bg-slate-100"
        } tw-transition-all  tw-border-black tw-border`}
      >
        <button
          className="tw-flex tw-space-x-2 tw-p-2 tw-items-center tw-justify-center"
          onClick={handleOnclick}
          disabled={loading}
        >
          {loading && <SmallSpinner />}
          <span>Content Assistant</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="tw-w-4 tw-h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12" y2="17"></line>
          </svg>
        </button>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">How can I help?</DialogTitle>
        <DialogContent>
          <Stack direction="column">
            <ToggleButtonGroup
              exclusive
              orientation="vertical"
              value={helpAction}
              onChange={handleHelpChange}
              aria-label="text formatting"
              color="info"
            >
              {actionHelpers.map((helperText, index) => (
                <ToggleButton
                  key={index}
                  value={helperText}
                  aria-label="bold"
                  sx={{ my: 1 }}
                >
                  {helperText}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
          <FormControl
            sx={{ mt: 1, width: 500 }}
            variant="outlined"
            onClick={() => {
              setHelpAction("");
            }}
          >
            <TextField
              // InputLabelProps={{ shrink: true }}
              value={textFieldValue}
              label="Do something else"
              multiline
              rows={1}
              onChange={handleTextChange}
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton
              //         component="span"
              //         color="primary"
              //         onClick={handleSubmit}
              //         disabled={helpAction ? false : true}
              //       >
              //         <SendIcon />
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            disabled={helpAction ? false : true}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HelpEditor;
