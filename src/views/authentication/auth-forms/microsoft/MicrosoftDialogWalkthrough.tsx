import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";

const MicrosoftDialogWalkthrough = ({
  open,
  handleClose,
  MS_AUTH_URL,
}: any) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="information-dialog-title"
        aria-describedby="information-dialog-description"
      >
        <DialogTitle id="information-dialog-title">
          Callsine Microsoft App Verification Notice
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            1. Our Microsoft application is currently in the process of being
            verified. We are actively working on this to ensure full compliance
            and security. It is completely safe to use.
          </Typography>
          <Typography gutterBottom>
            2. If you are not an admin within your Microsoft enterprise account,
            you may need to request consent from your admin. Please refer to the
            image below for guidance on sending a consent request.
          </Typography>
          <Box textAlign="center" marginTop={2} marginBottom={2}>
            <img
              src="./microsoft_consent_approval.png"
              alt="Consent approval process"
              style={{ maxWidth: "100%", height: "auto" }}
              className="tw-mx-auto"
            />
          </Box>
          <Typography gutterBottom>
            By following these steps, you will be able to seamlessly integrate
            our application into your workflow, taking advantage of all its
            features without any disruption. We appreciate your patience and
            understanding during this verification period.
          </Typography>
        </DialogContent>
        <DialogActions>
          <a href={MS_AUTH_URL}>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              className="tw-bg-primary tw-text-white"
            >
              I Understand
            </Button>
          </a>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MicrosoftDialogWalkthrough;
