import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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

type Member = {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  id?: number;
};

const TeamPage: React.FC = () => {
  const auth: any = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  console.log(members);
  console.log(members);
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
    setLoading(true);
    const memberData = {
      team: teamId,
      first_name: newMember.first_name,
      last_name: newMember.last_name,
      email: newMember.email,
      title: newMember.title,
      // Assuming 'title' in frontend maps to 'username' in backend
      username: newMember.title,
      // Handle password as required
      password: "DefaultPassword123", // Modify as required
    };

    console.log(memberData);

    http
      .post(`${endpoints.TEAM_MEMBERS}`, memberData)
      .then((response: any) => {
        http
          .get(`${endpoints.TEAM_MEMBERS}`)
          .then((response) => {
            setMembers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching team members:", error);
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
        console.error("Error adding team member:", error);
        setErrorMessage(
          "Error adding team member. Please ensure all fields are filled out"
        );
        setOpen(true);
        setLoading(false);
      });
  };

  const deleteMember = (memberId: number) => {
    http
      .delete(`${endpoints.TEAM_MEMBERS}${memberId}/`)
      .then((response) => {
        setMembers((prev) => prev.filter((member) => member.id !== memberId));
      })
      .catch((error) => {
        console.error("Error deleting team member:", error);
        setErrorMessage("Error deleting team member. Please try again.");
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
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Typography variant="h4" gutterBottom>
        Team Members
      </Typography>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              You will be charged within 72 hours of when new team members
              accept invite. They will recieve invite email once added to your
              team.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="first_name"
              value={newMember.first_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
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