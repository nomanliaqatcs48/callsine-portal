import { useEffect } from "react";
import {
  Grid,
  Typography,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";

import { gridSpacing } from "../../store/constant";
import RemainingClicks from "../../ui-component/cards/RemainingClicks";
import { useAuth } from "../../contexts/auth";
import TotalPersonsCard from "../../ui-component/cards/TotalPersons";
import TotalMailAccounts from "../../ui-component/cards/TotalMailAccounts";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { _columns } from "../../utils/dashboard/utils";
import MyTable from "../../ui-component/tables/MyTable";
import { usePersons } from "../../hooks/persons/usePersons";
import { useMailAccounts } from "../../hooks/mail-accounts/useMailAccounts";
import TotalScheduledEmailsCard from "../../ui-component/cards/TotalScheduledEmails";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Wizard, useWizard } from "react-use-wizard";
import { useDispatch } from "react-redux";
import { SET_MENU } from "src/store/actions";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const auth: any = useAuth();
  let {
    isLoading,
    getScheduledEmails,
    scheduledEmails,
    total,
    filters,
    setFilters,
  } = useDashboard();

  const { authProfile } = useAuthentication();
  const { mailAccountsData } = useMailAccounts(true, {
    limit: 99999,
    offset: 0,
  });

  useEffect(() => {
    /*if (authProfile && authProfile?.team !== 24) {
      navigate("/people");
    }*/
  }, [authProfile]);

  useEffect(() => {
    // dispatch({ type: SET_MENU, opened: false });
  }, [dispatch]);

  function Step1() {
    const { handleStep, previousStep, nextStep } = useWizard();

    // Attach an optional handler
    handleStep(() => {
      // alert("Going to step 2");
    });

    return (
      <Grid container className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4">
        <Grid item xs={12}>
          <Typography variant="h3">Step 1</Typography>
        </Grid>

        <form>
          <Grid item xs={12}>
            <label>
              What's your url?
              <input type="text" name="company-url" />
            </label>
          </Grid>
        </form>
        <Grid item xs={12}>
          <button onClick={() => previousStep()}>Previous ⏮️</button>
          <button onClick={() => nextStep()}>Next ⏭</button>
        </Grid>
      </Grid>
    );
  }
  function Step2() {
    const { handleStep, previousStep, nextStep } = useWizard();

    // Attach an optional handler
    handleStep(() => {
      // alert("Going to step 2");
    });

    return (
      <Grid container className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4">
        <Grid item xs={12}>
          <Typography variant="h3">Step 1</Typography>
        </Grid>

        <form>
          <Grid>
            <label>
              What's your value proposition?
              <input type="text" name="value-proposition" />
            </label>
          </Grid>
        </form>
        <Grid item xs={12}>
          <button onClick={() => previousStep()}>Previous ⏮️</button>
          <button onClick={() => nextStep()}>Next ⏭</button>
        </Grid>
      </Grid>
    );
  }
  function Step3() {
    const { handleStep, previousStep, nextStep } = useWizard();

    // Attach an optional handler
    handleStep(() => {
      // alert("Going to step 2");
    });

    return (
      <Grid container className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4">
        <Grid item xs={12}>
          <Typography variant="h3">Step 1</Typography>
        </Grid>

        <form>
          <Grid>
            <label>
              Give us some of your target URLs
              <input type="text" name="target-urls" />
            </label>
            <input type="submit" value="Submit" />
          </Grid>
        </form>
        <Grid item xs={12}>
          <button onClick={() => previousStep()}>Previous ⏮️</button>
          <button onClick={() => nextStep()}>Next ⏭</button>
        </Grid>
      </Grid>
    );
  }

  function Step4() {
    const { handleStep, previousStep, nextStep } = useWizard();

    // Attach an optional handler
    handleStep(() => {
      // alert("Going to step 3");
    });

    return (
      <Grid container className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4">
        <Grid item xs={12}>
          <Typography variant="h3">Step 2</Typography>
        </Grid>
        <Grid item xs={12}>
          <form>
            <label>
              Upload 2 peices of your marketing or sales material
              <input
                type="file"
                name="marketing-materials"
                className="tw-block tw-w-full tw-text-sm tw-text-slate-500
                tw-file:mr-4 tw-file:py-2 tw-file:px-4
                tw-file:tw-rounded-full tw-file:tw-border-0
                tw-file:tw-text-sm tw-file:tw-font-semibold
                tw-file:bg-violet-50 tw-file:tw-text-violet-700
                tw-hover:file:tw-bg-violet-100"
              />
            </label>
          </form>
        </Grid>
        <Grid item xs={12}>
          <button onClick={() => previousStep()}>Previous ⏮️</button>
          <button onClick={() => nextStep()}>Next ⏭</button>
        </Grid>
      </Grid>
    );
  }

  function Step5() {
    const { handleStep, previousStep, nextStep } = useWizard();

    // Attach an optional handler
    handleStep(() => {
      // alert("Going to step 2");
    });

    return (
      //Ask them to input 1 of their target contacts {name, email, company url]
      <Grid container className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4">
        <Grid item xs={12}>
          <Typography variant="h3">Step 3</Typography>
        </Grid>
        <form>
          <Grid item xs={12}>
            <label>
              What's your target contact's name?
              <input type="text" name="target-contact-name" />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label>
              What's your target contact's email?
              <input type="text" name="target-contact-email" />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label>
              What's your target contact's company url?
              <input type="text" name="target-contact-company-url" />
            </label>
          </Grid>
        </form>

        <Grid item xs={12}>
          <button onClick={() => previousStep()}>Previous ⏮️</button>
          <button onClick={() => nextStep()}>Next ⏭</button>
        </Grid>
      </Grid>
    );
  }

  function Step6() {
    const { handleStep, previousStep, nextStep, isLastStep } = useWizard();

    // Attach an optional handler
    handleStep(() => {
      // alert("Going to step 2");
    });

    return (
      <Grid container className="tw-space-y-2 xl:tw-space-y-0 xl:tw-space-x-4">
        <Grid item xs={12}>
          <Typography variant="h3">Step 4</Typography>
        </Grid>
        <Grid>// Select playbook templates</Grid>

        <Grid item xs={12}>
          <button onClick={() => previousStep()}>Previous ⏮️</button>
          {!isLastStep && <button onClick={() => nextStep()}>Next ⏭</button>}
        </Grid>
        <Grid item xs={12}>
          <button
            onClick={() => nextStep()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Finish
          </button>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Wizard>
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
        <Step6 />
      </Wizard>
    </>
  );
};

export default DashboardPage;
