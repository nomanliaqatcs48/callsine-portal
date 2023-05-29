import { MouseEvent, useState } from "react";
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import ReactSelect from "../../../../../ui-component/dropdowns/ReactSelect";

const PlaybookV2 = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <Grid container className="tw-p-0">
          <Grid
            item
            xs={5}
            lg={4}
            className="lg:tw-border-[1px] lg:tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6"
          >
            <div className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-4">
              {/*title*/}
              <div className="tw-text-[0.95rem] tw-text-black tw-font-medium tw-py-2">
                Playbooks
              </div>
              {/*dropdown*/}
              <div>
                <ReactSelect
                  name="generate-playbook"
                  className="basic-single tw-cursor-pointer"
                  variant="blue"
                  placeholder="GENERATE PLAYBOOK"
                  isClearable={false}
                  isSearchable={false}
                  options={[
                    { label: "Playbook 1", value: 1 },
                    { label: "Playbook 2", value: 2 },
                  ]}
                />
              </div>
            </div>
            <div className="search-container tw-py-3 tw-px-2 xl:tw-py-4 xl:tw-px-5">
              <input
                type="search"
                placeholder="Search"
                onChange={() => null}
                className="tw-bg-[#f8fbff] tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-2.5 tw-px-[1.2rem] tw-outline-none placeholder:tw-text-xs"
              />
            </div>
            <div className="list-container">
              <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemText primary="Trash" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemText primary="Spam" />
                </ListItemButton>
              </List>
            </div>
          </Grid>
          <Grid item xs={7} lg={8}>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PlaybookV2;
