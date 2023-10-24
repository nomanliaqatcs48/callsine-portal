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
import { useAuth } from "src/contexts/auth";
import useGetTeamMe from "src/hooks/settings/useGetTeam";
import useGetUserMe from "src/hooks/settings/useGetUser";
import usePatchUsersMe from "src/hooks/settings/usePatchUser";
import useUpdateTeam from "src/hooks/settings/useUpdateTeam";
import { HtmlTooltip } from "src/ui-component/tooltip/HtmlTooltip";
import US_STATES from "src/utils/form-variables";

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
}

interface SelectField {
  label: string;
  name: string;
  type: "select";
  options: any;
}

type Field = TextFieldProps | SelectField;

const companyFields: Field[] = [
  { label: "Company URL", name: "domain", type: "text" },
  { label: "Company Name", name: "name", type: "text" },
  { label: "Company City", name: "company_city", type: "text" },
  {
    label: "Company State",
    name: "company_state",
    type: "select",
    options: US_STATES, // Replace with your states
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
  { label: "First Name", name: "first_name", type: "text" },
  { label: "Last Name", name: "last_name", type: "text" },
  { label: "Account Email Address", name: "email", type: "text" },
  { label: "User City", name: "user_city", type: "text" },
  {
    label: "User State",
    name: "user_state",
    type: "select",
    options: US_STATES, // Replace with your states
  },
  { label: "User Title", name: "user_title", type: "text" },
];

const SettingsPage: React.FC = () => {
  const { auth, updateProfile } = useAuth();
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

  const handleSaveUserInfo = async () => {
    await patchData({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      user_city: userData.user_city,
      user_state: userData.user_state,
      user_title: userData.user_title,
    });
  };

  const handleSaveTeamInfo = async () => {
    await updateTeam({
      domain: teamDataState.domain,
      name: teamDataState.name,
      company_city: teamDataState.company_city,
      company_state: teamDataState.company_state,
      company_value_prop: teamDataState.company_value_prop,
    });
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
      <Typography className="tw-text-[40px] tw-tracking-[0.8px] tw-text-black tw-font-comfortaa tw-font-bold">
        Settings
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography className="tw-text-[16px] tw-tracking-[0.32px] tw-text-black tw-font-normal">
                This is where you can edit your account information and company
                information.
              </Typography>
            </React.Fragment>
          }
        >
          <InfoOutlinedIcon className="tw-text-[20px] tw-text-[#778DA9] tw-ml-2" />
        </HtmlTooltip>
      </Typography>
      <Grid className="tw-my-5" />
      <div className="tw-m-4">
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
              >
                Save Company Info
              </Button>
            </Grid>
          </Grid>
        </Paper>
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
