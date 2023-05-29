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
            className="lg:tw-border-[1px] lg:tw-border-[#f0f1f3] tw-py-3"
          >
            <div className="playbook-dropdown-container tw-flex tw-flex-col tw-items-center tw-px-2 xl:tw-flex-row xl:tw-justify-between xl:tw-px-3">
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
