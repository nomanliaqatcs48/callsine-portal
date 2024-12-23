import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "src/contexts/auth";
import http from "src/services/axios";
import { endpoints } from "src/services/endpoints";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";

type Member = {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  id?: number;
};

const TeamPage: React.FC = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState<Member>({
    first_name: "",
    last_name: "",
    title: "",
    email: "",
    id: 0,
  });
  const teamId = auth?.team; // You'll need to determine how you get the current team's ID

  useEffect(() => {
    http
      .get(`${endpoints.TEAM_MEMBERS}`)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
      });
  }, [teamId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = () => {
    const isValidName = (name: string) => /^[a-zA-Z\s]{1,20}$/.test(name);
    const isValidTitle = (title: string) =>
      /^[a-zA-Z0-9\s]*$/.test(title) && title.length <= 25;

    const isValidEmail = (email: string) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    if (
      !newMember.first_name ||
      !newMember.last_name ||
      !newMember.title ||
      !newMember.email
    ) {
      setAlertMessage({
        error: true,
        message: "Please fill up the required fields.",
      });
      setOpen(true);
      setLoading(false);
      return;
    }
    if (!newMember.first_name || !isValidName(newMember.first_name)) {
      setAlertMessage({
        error: true,
        message:
          "Please enter a valid first name with alphabetic characters and spaces (max 20 characters).",
      });
      setOpen(true);
      setLoading(false);
      return;
    }

    // Validate last_name
    if (!newMember.last_name || !isValidName(newMember.last_name)) {
      setAlertMessage({
        error: true,
        message:
          "Please enter a valid last name with alphabetic characters and spaces (max 20 characters).",
      });
      setOpen(true);
      setLoading(false);
      return;
    }

    // Validate title
    if (!newMember.title || !isValidTitle(newMember.title)) {
      setAlertMessage({
        error: true,
        message:
          "Please enter a valid title with alphanumeric characters and spaces (max 25 characters).",
      });
      setOpen(true);
      setLoading(false);
      return;
    }

    // Validate email
    if (!newMember.email || !isValidEmail(newMember.email)) {
      setAlertMessage({
        error: true,
        message: "Please enter a valid email address.",
      });
      setOpen(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    const memberData = {
      team: teamId,
      first_name: newMember.first_name,
      last_name: newMember.last_name,
      email: newMember.email,
      title: newMember.title,
      // Assuming 'title' in frontend maps to 'username' in backend
      username: newMember.first_name + " " + newMember.email,
      // Handle password as required
      password: "DefaultPassword123", // Modify as required
    };

    http
      .post(`${endpoints.TEAM_MEMBERS}`, memberData)
      .then((response: any) => {
        http
          .get(`${endpoints.TEAM_MEMBERS}`)
          .then((response) => {
            // console.log(response);
            setMembers(response.data);
            setAlertMessage({
              error: false,
              message: "Team member added successfully!",
            });
            setOpen(true);
            setLoading(false);
          })
          .catch((error) => {
            // console.error("Error fetching team members:", error);
            setAlertMessage({
              error: true,
              message: `"Error fetching team members:", ${error}`,
            });
          });
        setLoading(false);
        setNewMember({
          first_name: "",
          last_name: "",
          title: "",
          email: "",
        });
      })
      .catch((error: any) => {
        // console.error("Error adding team member:", error);
        setAlertMessage({
          error: true,
          message: `Error adding team member: ${
            error?.request?.response
              ? error.request.response.replace(/[\[\]"\{\}]/g, "").trim()
              : "Unknown error"
          }`,
        });

        setOpen(true);
        setLoading(false);
      });
  };

  const deleteMember = (memberId: number) => {
    http
      .delete(`${endpoints.TEAM_MEMBERS}${memberId}/`)
      .then((response) => {
        setMembers((prev) => prev.filter((member) => member.id !== memberId));
        setAlertMessage({
          error: false,
          message: "Deleted successfully.",
        });
        setOpen(true);
        setLoading(false);
      })
      .catch((error) => {
        // console.error("Error deleting team member:", error);
        setAlertMessage({
          error: true,
          message: "Error deleting team member. Please try again.",
        });
        // setErrorMessage("Error deleting team member. Please try again.");
        setOpen(true);
      });
  };

  const openModal = (member: Member) => {
    setMemberToRemove(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setMemberToRemove(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          variant="filled"
          severity={alertMessage && alertMessage.error ? "error" : "success"}
        >
          {/* {errorMessage} */}
          {alertMessage.message}
        </Alert>
      </Snackbar>

      <Box className="tw-mb-10">
        <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
          Team
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal">
                  Add to your team by inviting people you work with to share
                  your account. You can add as many team members as you want.
                </Typography>
              </React.Fragment>
            }
          >
            <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
          </HtmlTooltip>
        </Typography>
      </Box>
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <Grid container spacing={2} className="tw-p-5">
          <Grid item xs={12}>
            <Typography className="tw-text-[16px]">
              You will be charged within 72 hours of when new team members
              accept invite. They will receive invite email once added to your
              team. (This screen is only visible to you as the Team
              Administrator.)
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              label="First Name"
              variant="outlined"
              name="first_name"
              value={newMember.first_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              label="Last Name"
              variant="outlined"
              name="last_name"
              value={newMember.last_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={newMember.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={newMember.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="tw-bg-green-600 hover:tw-bg-green-500 tw-text-[16px] tw-font-medium tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase"
              variant="contained"
              color="primary"
              onClick={addMember}
            >
              {loading ? "Adding..." : "Add Member"}
            </Button>
          </Grid>
        </Grid>
        <List>
          {members.map((member, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${member.first_name} ${member.last_name}`}
                secondary={`${member.title}, ${member.email}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => openModal(member)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {isModalOpen && memberToRemove && (
          <Dialog open={isModalOpen} onClose={closeModal}>
            <DialogTitle>{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {`Are you sure you want to remove ${memberToRemove.first_name} ${memberToRemove.last_name}? This action cannot be undone.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (memberToRemove.id !== undefined) {
                    deleteMember(memberToRemove.id);
                    closeModal();
                  }
                }}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Paper>
    </>
  );
};

export default TeamPage;
