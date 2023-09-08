import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector } from "react-redux";
import { selectPlaybookData } from "src/store/reducer";
import { usePlaybook } from "src/hooks/playbook/usePlaybook";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import { VisibilityOutlined } from "@mui/icons-material";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Playbook = {
  name: string;
  subtext: string;
  prompts: any[];
};

export default function WizardPlaybooksOptionsGroup() {
  usePlaybook(true);

  const playbooks = useSelector(selectPlaybookData);

  const [selected, setSelected] = useState(-1);

  const [selectedPlaybookData, setSelectedPlaybookData] = useState<Playbook>();

  const [open, setOpen] = useState(false);

  const handleOpen = (playbook: Playbook) => {
    setSelectedPlaybookData(playbook);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {playbooks.map((playbook: Playbook, index: number) => {
              return (
                <ListItem
                  key={playbook.name + "" + index}
                  secondaryAction={
                    <IconButton
                      onClick={() => handleOpen(playbook)}
                      edge="end"
                      aria-label="comments"
                    >
                      <VisibilityOutlined />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={() => setSelected(index)}
                    dense
                  >
                    <FormControlLabel
                      value={playbook.name}
                      control={<Radio checked={selected === index} />}
                      label={playbook.name}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </RadioGroup>
      </FormControl>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedPlaybookData?.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {selectedPlaybookData?.subtext}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}
