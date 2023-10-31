import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function InfoModal() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ marginRight: 4 }} onClick={handleClickOpen}>
        How to Build a Playbook
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography fontSize={20}> How to Build a Playbook </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
            <br />
            <b> Playbook:</b> A series of instructions, called Prompts, that
            will generate a sequence of emails.
            <br />
            <b> Prompt:</b> The instructions for each email in a sequence of
            emails.
          </Typography>
          <Typography paragraph>
            <h3>To create a Playbook: </h3>
            <br />
            <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
              <li>Click Add Playbook</li>
              <li>Add a name and click to save.</li>
              <li>Select the Playbook from the list you created.</li>
              <li>Click Add Prompt.</li>
              <li>
                Add your instructions (these can be edited later so just start
                typing!).
              </li>
              <li>Click to save your prompt.</li>
            </ol>
          </Typography>
          <Typography paragraph>
            We suggest creating a Playbook consisting of at least three Prompts.
            <br />
            <br />
            Play around with merge tags, test the results on a few contacts, and
            feel the full power of Callsine!
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InfoModal;
