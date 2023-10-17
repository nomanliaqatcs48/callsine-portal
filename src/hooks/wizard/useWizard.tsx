import { TextField, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { updateTeamMeService } from "src/services/profile.service";
import useGetTeamMe from "../settings/useGetTeam";

const useWizard = () => {
  const { data: teamData } = useGetTeamMe();

  // State setup for all steps
  const [domain, setCompanyUrl] = useState("");
  const [company_value_prop, setValueProposition] = useState("");
  const [initialContactUrl, setTargetUrl] = useState("");
  const [marketingMaterial, setMarketingMaterial] = useState("");
  const [salesMaterial, setSalesMaterial] = useState("");
  const [initialContactFirst, setFirstName] = useState("");
  const [initialContactLast, setLastName] = useState("");
  const [initialContactEmail, setEmail] = useState("");
  const [initialContactTitle, setTitle] = useState("");
  const [initialContactCompanyName, setCompanyName] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  // Load team data initially, if available
  useEffect(() => {
    if (teamData) {
      setCompanyUrl(teamData.domain || "");
    }
  }, [teamData]);

  // Function to send collected data to the backend
  const sendDataToBackend = async () => {
    const payload = {
      domain,
      company_value_prop,
      initialContactFirst,
      initialContactLast,
      initialContactCompanyName,
      initialContactEmail, //
      initialContactTitle,
      initialContactUrl,
    };

    try {
      // Replace with your actual API endpoint
      const response = await updateTeamMeService(payload);
      console.log(response.data);
      window.location.href = "/people";
    } catch (error) {
      console.error(
        "An error occurred when sending data to the backend: ",
        error
      );
      // Handle your error accordingly
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      sendDataToBackend();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Steps content setup
  const steps = [
    // Step 1
    {
      label: "Step 1: Company URL",
      description:
        "Please provide the URL that is most representative of your business and market position. This will start training the AI on your company.",
      content: () => (
        <TextField
          style={{ marginTop: 10 }}
          fullWidth
          variant="outlined"
          placeholder="What is your company website URL?"
          value={domain}
          onChange={(e) => setCompanyUrl(e.target.value)}
        />
      ),
    },
    // Step 2
    {
      label: "Step 2: Value Proposition",
      description:
        "Please provide a 1-2 sentence overview of your value proposition. This helps the AI to refine its understanding.",
      content: () => (
        <TextareaAutosize
          minRows={3}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: 10,
            borderRadius: 5,
          }}
          placeholder="What is your value proposition?"
          value={company_value_prop}
          onChange={(e) => setValueProposition(e.target.value)}
        />
      ),
    },
    // Step 3
    {
      label: "Step 3: Target URL",
      description:
        "Please provide a URL from one of your target prospects. This helps the system start gathering relevant data for your outreach.",
      content: () => (
        <TextField
          style={{ marginTop: 10 }}
          fullWidth
          variant="outlined"
          placeholder="Enter target URL"
          value={initialContactUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
        />
      ),
    },
    // Step 4
    {
      label: "Step 4: Marketing and Sales Material",
      description:
        "Upload your marketing or sales material. This helps the AI understand your company's positioning and offerings better.",
      content: () => (
        <>
          <TextField
            type="file"
            margin="normal"
            variant="outlined"
            placeholder="Last Name"
            // value={lastName}
            // onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            type="file"
            margin="normal"
            variant="outlined"
            placeholder="Last Name"
            // value={lastName}
            // onChange={(e) => setLastName(e.target.value)}
          />
        </>
      ),
    },
    // Step 5
    {
      label: "Step 5: Target Contacts",
      description:
        "Add a contact at the company you provided in step 3. The system will generate your first emails to this contact.",
      content: () => (
        <div>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="First Name"
            value={initialContactFirst}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Last Name"
            value={initialContactLast}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Email Address"
            value={initialContactEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Company Name"
            value={initialContactCompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Title"
            value={initialContactTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      ),
    },
    // Additional steps, if any...
  ];

  return {
    steps,
    handleNext,
    handleBack,
    handleReset,
    activeStep,
  };
};

export { useWizard };
