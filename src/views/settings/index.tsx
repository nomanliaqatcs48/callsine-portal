import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useGetTeamMe from "src/hooks/settings/useGetTeam";
import useGetUserMe from "src/hooks/settings/useGetUser";
import usePatchUsersMe from "src/hooks/settings/usePatchUser";
import useUpdateTeam from "src/hooks/settings/useUpdateTeam";
import { Alert, Snackbar } from "@mui/material";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";
import US_STATES from "src/utils/form-variables";
import { save, load } from "src/utils/storage";

import { removeBodyLoader } from "../../helpers/loaders";
import { devLog, devLogError } from "../../helpers/logs";
import { profileService } from "../../services/profile.service";

interface TeamState {
  domain: string;
  name: string;
  company_city: string;
  company_state: string;
  company_value_prop: string;
}

interface UserState {
  first_name: string;
  last_name: string;
  email: string;
  user_city: string;
  user_state: string;
  user_title: string;
}

// Define the types for the fields
interface TextFieldProps {
  label: string;
  name: string;
  type: "text" | "textarea";
  isRequired: boolean;
}

interface SelectField {
  label: string;
  name: string;
  type: "select";
  options: any;
  isRequired: boolean;
}

type Field = TextFieldProps | SelectField;

const companyFields: Field[] = [
  { label: "Company URL", name: "domain", type: "text", isRequired: false },
  { label: "Company Name", name: "name", type: "text", isRequired: false },
  {
    label: "Company City",
    name: "company_city",
    type: "text",
    isRequired: false,
  },
  {
    label: "Company State",
    name: "company_state",
    type: "select",
    options: US_STATES, // Replace with your states
    isRequired: false,
  },
  //   { label: "Company Value Proposition", name: "valueProp", type: "textarea" },
  //   {
  //     label: "Company Target Function",
  //     name: "targetFunction",
  //     type: "select",
  //     options: ["Function1", "Function2"], // Replace with your functions
  //   },
  //   {
  //     label: "Company Target Management Level",
  //     name: "managementLevel",
  //     type: "select",
  //     options: ["Level1", "Level2"], // Replace with your management levels
  //   },
];

const userFields: Field[] = [
  { label: "First Name", name: "first_name", type: "text", isRequired: true },
  { label: "Last Name", name: "last_name", type: "text", isRequired: true },
  {
    label: "Account Email Address",
    name: "email",
    type: "text",
    isRequired: true,
  },
  { label: "User City", name: "user_city", type: "text", isRequired: true },
  {
    label: "User State",
    name: "user_state",
    type: "select",
    options: US_STATES, // Replace with your states
    isRequired: false,
  },
  { label: "User Title", name: "user_title", type: "text", isRequired: true },
];

const SettingsPage: React.FC = () => {
  const { loading, data, error } = useGetUserMe();
  const { patchData } = usePatchUsersMe(); // Use the patch hook
  const { data: teamData } = useGetTeamMe(); // Use
  const { updateTeam } = useUpdateTeam();

  const [teamDataState, setTeamDataState] = useState<TeamState>({
    domain: "",
    name: "",
    company_city: "",
    company_state: "",
    company_value_prop: "",
  });

  const [alertMessage, setAlertMessage] = React.useState({
    onRequestCompanyInfo: false,
    onRequestMeInfo: false,
    open: false,
    error: false,
    message: "",
  });

  const closeHandleAlert = () => {
    setAlertMessage((prevAlertMessage) => ({
      ...prevAlertMessage,
      open: false,
    }));
  };

  const [isSubmitUser, setIsSubmitUser] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserState>({
    first_name: "",
    last_name: "",
    email: "",
    user_city: "",
    user_state: "",
    user_title: "",
  });

  // Update the local state when data is fetched
  useEffect(() => {
    if (data) {
      setUserData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email,
        user_city: data.user_city || "",
        user_state: data.user_state || "",
        user_title: data.user_title || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (teamData) {
      setTeamDataState({
        domain: teamData.domain,
        name: teamData.name,
        company_city: teamData.company_city || "",
        company_state: teamData.company_state || "",
        company_value_prop: teamData.company_value_prop || "",
      });
    }
  }, [teamData]);

  const getProfile = async () => {
    try {   
        let res = await profileService();
        if (res?.data) {
          await save("profile", res.data);
          window.location.reload();
        }
        devLog(() => {
          console.log("res", res);
        });
    } catch (e: any) {
      devLogError(() => {
        console.error(e);
      });

      removeBodyLoader();
    }
  };

  const handleSaveUserInfo = async () => {
    setIsSubmitUser(true);
 
    const { first_name, last_name, email, user_city, user_state, user_title } =
      userData;
    if (first_name && last_name && email && user_city && user_title) {
      setAlertMessage((prevAlertMessage) => ({
        ...prevAlertMessage,
        onRequestMeInfo: true,
      }));
      try {
        await patchData({
          first_name,
          last_name,
          email,
          user_city,
          user_state,
          user_title,
        });
        setIsSubmitUser(false);
        setAlertMessage((prevAlertMessage) => ({
          ...prevAlertMessage,
          onRequestMeInfo: false,
          open: true,
          error: false,
          message: "Successfully updated!",
        }));
        getProfile()
      } catch (e) {
        setAlertMessage((prevAlertMessage) => ({
          ...prevAlertMessage,
          onRequestMeInfo: false,
          open: true,
          error: true,
          message: "Successfully updated!",
        }));
      }
    }
  };

  const handleSaveTeamInfo = async () => {
    setAlertMessage((prevAlertMessage) => ({
      ...prevAlertMessage,
      onRequestCompanyInfo: true,
    }));
    try {
      await updateTeam({
        domain: teamDataState.domain,
        name: teamDataState.name,
        company_city: teamDataState.company_city,
        company_state: teamDataState.company_state,
        company_value_prop: teamDataState.company_value_prop,
      });
      setAlertMessage((prevAlertMessage) => ({
        ...prevAlertMessage,
        onRequestCompanyInfo: false,
        open: true,
        error: false,
        message: "Successfully updated!",
      }));
    } catch (e) {
      setAlertMessage((prevAlertMessage) => ({
        ...prevAlertMessage,
        onRequestCompanyInfo: false,
        open: true,
        error: true,
        message: "An error occured, please try again later.",
      }));
    }
  };

  const handleValue = (name: string, type: "user" | "team") => {
    if (type === "user") {
      return userData[name as keyof UserState] || "";
    } else {
      return teamDataState[name as keyof TeamState] || "";
    }
  };

  const handleUserTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeamTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTeamDataState((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeamSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setTeamDataState((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderField = (field: Field, type: "user" | "team") => {
    const targetData = type === "user" ? userData : teamDataState;
    const setData = type === "user" ? setUserData : setTeamDataState;
    switch (field.type) {
      case "text":
      case "textarea":
        return (
          <div>
            <InputLabel className="tw-block tw-mb-2">{field.label}</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              name={field.name}
              value={handleValue(field.name, type)}
              onChange={
                type === "user"
                  ? handleUserTextFieldChange
                  : handleTeamTextFieldChange
              }
              multiline={field.type === "textarea"}
              rows={field.type === "textarea" ? 4 : undefined}
              className="tw-my-2"
              inputProps={{ maxLength: 40 }}
              error={
                isSubmitUser &&
                field.isRequired &&
                !handleValue(field.name, type)
                  ? true
                  : false
              }
              helperText={
                isSubmitUser &&
                field.isRequired &&
                !handleValue(field.name, type) &&
                "Please enter the value"
              }
            />
          </div>
        );

      case "select":
        return (
          <div>
            <InputLabel className="tw-block tw-mb-2">{field.label}</InputLabel>
            <Select
              fullWidth
              variant="outlined"
              name={field.name}
              value={handleValue(field.name, type)}
              onChange={
                type === "user"
                  ? handleUserSelectChange
                  : handleTeamSelectChange
              }
              className="tw-my-2"
            >
              {field.options.map((option: any, index: number) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Snackbar
        open={alertMessage.open}
        autoHideDuration={6000}
        onClose={() => closeHandleAlert()}
      >
        <Alert
          onClose={() => closeHandleAlert()}
          severity={alertMessage && alertMessage.error ? "error" : "success"}
        >
          {alertMessage.message}
        </Alert>
      </Snackbar>
      <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
        Settings
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal">
                This is where you can edit your account information and company
                information. Please note that AI uses these fields when
                referring to you and your company in messaging, so please
                complete them with that in mind.
              </Typography>
            </React.Fragment>
          }
        >
          <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
        </HtmlTooltip>
      </Typography>
      <Grid className="tw-my-5" />
      <div className="tw-m-4">
        {data?.role === "ADMIN" && (
          <Paper
            elevation={1}
            className="tw-p-4 tw-mb-4 tw-rounded-lg tw-bg-white"
          >
            <Typography
              variant="h5"
              className="tw-mb-4 tw-text-black tw-font-normal"
            >
              Company
            </Typography>
            <Grid container spacing={3}>
              {companyFields.map((field, index) => (
                <Grid item xs={6} key={index}>
                  {renderField(field, "team")}
                </Grid>
              ))}
              <Grid item xs={12} className="tw-flex tw-justify-end">
                <Button
                  variant="contained"
                  className="tw-bg-primary tw-mt-2"
                  onClick={handleSaveTeamInfo}
                  disabled={alertMessage.onRequestCompanyInfo}
                >
                  Save Company Info
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
        <Paper elevation={2} className="tw-p-4 tw-rounded-lg tw-bg-white">
          <Typography
            variant="h5"
            className="tw-mb-4 tw-text-black tw-font-normal"
          >
            Your Info
          </Typography>
          <Grid container spacing={3}>
            {userFields.map((field, index) => (
              <Grid item xs={6} key={index}>
                {renderField(field, "user")}
              </Grid>
            ))}
            <Grid item xs={12} className="tw-flex tw-justify-end">
              {/* <Button
              variant="contained"
              className="tw-bg-blue-400"
              color="primary"
            >
              Reset Password
            </Button> */}
              <Button
                variant="contained"
                color="primary"
                className="tw-mr-2 tw-bg-primary"
                onClick={handleSaveUserInfo}
                disabled={alertMessage.onRequestMeInfo}
              >
                Save Your Info
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default SettingsPage;
