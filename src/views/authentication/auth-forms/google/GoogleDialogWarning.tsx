import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const GoogleDialogWarning = ({ open, handleClose, GOOGLE_AUTH_URL }: any) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="information-dialog-title"
        aria-describedby="information-dialog-description"
      >
        <DialogTitle id="information-dialog-title">
          Callsine Google App Verification Notice
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Our Google application is currently in the process of being
            verified. We are actively working on this to ensure full compliance
            and security. It is completely{" "}
            <span className="tw-font-bold">safe to use</span>. Follow these
            steps to grant the necessary permissions and start using the
            application:
          </Typography>

          <Box textAlign="center" marginTop={2} marginBottom={2}>
            <img
              src="./google_warning_consent.png"
              alt="Consent approval process"
              style={{ maxWidth: "100%", height: "auto" }}
              className="tw-mx-auto"
            />
          </Box>

          <List>
            <ListItem>
              <ListItemText primary='1. Click the "Advanced" option in the Google consent screen to see more options.' />
            </ListItem>
            <ListItem>
              <ListItemText primary='2. Locate "Callsine" in the list of permissions and services.' />
            </ListItem>
            <ListItem>
              <ListItemText primary='3. Click on "Continue" to proceed with granting permissions, which will allow the application to operate within the scope required for full functionality.' />
            </ListItem>

            <ListItem>
              <ListItemText primary="4. Review the permissions being requested and, if you agree, confirm your consent." />
            </ListItem>
          </List>
          <Typography gutterBottom>
            By following these steps, you will be able to seamlessly integrate
            our application into your workflow, taking advantage of all its
            features without any disruption. We appreciate your patience and
            understanding during this verification period.
          </Typography>
        </DialogContent>
        <DialogActions>
          <a href={GOOGLE_AUTH_URL}>
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

export default GoogleDialogWarning;
