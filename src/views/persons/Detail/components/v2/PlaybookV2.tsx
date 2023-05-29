import { Grid, Paper } from "@mui/material";
import ReactSelect from "../../../../../ui-component/dropdowns/ReactSelect";

const PlaybookV2 = () => {
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
            className="lg:tw-border-[1px] lg:tw-border-[#f0f1f3]"
          >
            <div className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center xl:tw-flex-row xl:tw-justify-between">
              <div className="tw-text-[0.95rem] tw-text-black tw-font-medium">
                Playbooks
              </div>
              <div>
                <ReactSelect
                  name="generate-playbook"
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
