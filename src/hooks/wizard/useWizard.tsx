import { Input, TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import WizardPlaybooksOptionsGroup from "src/views/wizard/components/PlaybooksList";

const useWizard = () => {
  const [companyUrl, setCompanyUrl] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [targetUrls, setTargetUrls] = useState("");
  const [marketingMaterial, setMarketingMaterial] = useState("");
  const [salesMaterial, setSalesMaterial] = useState("");
  const [targetContacts, setTargetContacts] = useState("");
  const [playbook, setPlaybook] = useState("");

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        console.log("step 0 - action here");
        break;
      case 1:
        console.log("step 1 - action here");
        break;
      case 2:
        console.log("step 2 - action here");
        break;
      case 3:
        console.log("step 3 - action here");
        break;
      case 4:
        console.log("step 4 - action here");
        break;
      case 5:
        console.log("step 5 - action here");
        break;
      default:
        console.log("default");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: "Step 1: Company URL",
      description: `The company URL is essential for getting relevant data. This information will help us better understand your business, its products or services, and the market positioning, which are crucial for creating a tailored playbook.`,
      content: () => {
        return (
          <div className="tw-my-2">
            <TextField
              className="tw-my-2 tw-w-[380px]"
              variant="outlined"
              placeholder="What is your company website URL?"
              onChange={(e) => setCompanyUrl(e.target.value)}
            />
          </div>
        );
      },
    },
    {
      label: "Step 2: Value Proposition",
      description:
        "Your value proposition informs the core of your marketing and sales strategies. Understanding it allows us to tailor your playbook in a way that accentuates your strengths and effectively communicates the unique benefits of your offerings.",
      content: () => {
        return (
          <TextareaAutosize placeholder="What is your value propisition?" />
        );
      },
    },
    {
      label: "Step 3: Target URLs",
      description: `Knowing your target URLs helps us identify the focus areas for your campaign. It enables us to craft strategies that will guide potential customers towards these specific parts of your digital presence, thereby optimizing for conversions.`,
      content: () => {
        return (
          <TextField
            className="tw-my-2 tw-w-[380px]"
            variant="outlined"
            placeholder="Enter Target Url"
          />
        );
      },
    },
    {
      label: "Step 4: Sample Marketing or Sales Material",
      description: `Understanding your current marketing and sales materials allows us to align the playbook with your existing strategies and branding. It also gives us insights into what has been working for you and what could be improved.`,
      content: () => {
        return (
          <div>
            <TextField
              className="tw-my-2 tw-w-[380px]"
              variant="outlined"
              placeholder="Enter your name"
              type="file"
            />
            <TextField
              className="tw-my-2 tw-w-[380px]"
              variant="outlined"
              placeholder="Enter your name"
              type="file"
            />
          </div>
        );
      },
    },
    {
      label: "Step 5: Target Contacts",
      description: `Knowing your target contact's details will enable us to tailor the playbook to address the specific pain points, needs, and preferences of these individuals. This makes your campaign more effective and increases the chances of engagement.`,
      content: () => {
        return (
          <div className="tw-my-2">
            <TextField
              className="tw-my-2 tw-w-[380px]"
              variant="outlined"
              placeholder="Name: "
            />
            <TextField
              className="tw-my-2 tw-w-[380px]"
              variant="outlined"
              placeholder="Email: "
            />
            <TextField
              className="tw-my-2 tw-w-[380px]"
              variant="outlined"
              placeholder="Company Website URL"
            />
          </div>
        );
      },
    },
    {
      label: "Step 6: Select Playbook",
      description: `Choosing a playbook type gives us a framework within which to customize your strategies and tactics. Different playbooks focus on different outcomes, and selecting the most relevant one ensures that we're on the same page regarding your campaign goals.`,
      content: () => {
        return <WizardPlaybooksOptionsGroup />;
      },
    },
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
