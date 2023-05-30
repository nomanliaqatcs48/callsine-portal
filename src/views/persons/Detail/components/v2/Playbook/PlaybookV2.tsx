import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import PlaybookList from "./PlaybookList";
import DraftEmail from "./DraftEmail";
import Email from "./Email";
import SelectItem from "./SelectItem";
import { useState } from "react";

const PlaybookV2 = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <Paper
        elevation={0}
        className="tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]"
      >
        <Grid container className="tw-p-0">
          <Grid
            item
            xs={12}
            sm={5}
            lg={4}
            className="sm:tw-border-r-[1px] sm:tw-border-[#f0f1f3] tw-py-3 xl:tw-py-6"
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
              <PlaybookList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={7} lg={8}>
            {selectedIndex !== null && (
              <>
                <Email />
                {/*<DraftEmail />*/}
              </>
            )}

            {selectedIndex === null && <SelectItem />}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PlaybookV2;
