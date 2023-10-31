import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import image from "src/assets/images/tutorial/generate_emails.png"; // Import the image
import help from "src/assets/images/tutorial/help.png"; // Import the image
import importing from "src/assets/images/tutorial/import.png"; // Import the image
import materials from "src/assets/images/tutorial/materials.png"; // Import the image
import people from "src/assets/images/tutorial/people.png"; // Import the image
import playbook from "src/assets/images/tutorial/playbook.png"; // Import the image
import { updateTeamMeService } from "src/services/profile.service";
import useGetTeamMe from "../settings/useGetTeam";

const useTutorial = () => {
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
  const [submitted, setSubmitted] = useState(false);

  console.log("ACTIVE STEP", activeStep);

  // Load team data initially, if available
  useEffect(() => {
    if (teamData) {
      setCompanyUrl(teamData.domain || "");
    }
  }, [teamData]);

  // Function to send collected data to the backend
  const sendDataToBackend = async (navigate: boolean) => {
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
      if (navigate) {
        window.location.href = "/people";
      }
    } catch (error) {
      console.error(
        "An error occurred when sending data to the backend: ",
        error
      );
      // Handle your error accordingly
    }
  };

  const handleNext = () => {
    if (activeStep === 2) {
      sendDataToBackend(false);
    }
    if (activeStep === steps.length - 1) {
      sendDataToBackend(true);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const refresh = async () => {
    setSubmitted(true);
  };

  // Steps content setup
  const steps = [
    // Step 1
    {
      label: "What does CallSine do?",
      description:
        "CallSine is an generative AI app that uses your sales & marketing material to learn about your company to generate high quality outreach content tailored to your company. Then, it researches the prospects you provide to the system to further customize the content down to each individual.",
      content: () => (
        <Typography color="white" mt={2} mb={2}>
          {" "}
          Everything you do related to importing contacts, creating playbooks,
          and generating emails is focused on the singular goal: automatically
          writing contextualized and personalized outreach to your prospects.{" "}
        </Typography>
      ),
    },
    {
      label: "Where it starts: the Playbook",
      description:
        "If you have used sales engagement or marketing automation tools in the past you are familiar with loading in a sequence of templated emails that will be sent to hundreds or even thousands of prospects.",
      content: () => (
        <>
          <Typography color="white" mt={2} mb={2}>
            {" "}
            <b>
              {" "}
              You can think of the Plabook as the replacement for generic
              templates.
            </b>{" "}
            Instead, a playbook is a series of instructions, or Prompts, you
            give to the system for writing outreach emails.
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            {" "}
            The methodology allows you to control the intent and subject matter
            of the email, but the system will take on the task of drawing from
            relevant data and writing the actual emails for each prospect.
          </Typography>
          <Box
            component="img"
            src={playbook}
            alt="Description"
            sx={{ width: 200, height: "auto" }}
          />
          <Typography color="white" mt={2} mb={2}>
            By constructing a playbook of a handful of prompts, you{" "}
            <b> can generate a series of personalized emails in seconds,</b>{" "}
            where it would have taken you hours to do the same work.
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            Final word on Playbooks: you have complete control over the content
            that is actually sent. Over time will learn how to write the best
            the prompts, but we already created a starter Playbook for you!
          </Typography>
        </>
      ),
    },
    {
      label: "More on Prompts...",
      description:
        "Prompts consist of two elements: the content and the position.",
      content: () => (
        <>
          <Typography color="white" mt={2} mb={2}>
            <b>The content can be as intricate or simple as you'd like. </b>As
            you play with the system you will learn what works best for you.
            When you login for the first time, you will be able to generate
            emails using your sample Playbook, which has Prompts pre-populated.
            The prompt that gives a lot of our first time users a very good
            starting point is as simple as:
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            <i>
              {" "}
              "Write an introductory sales email to &#123;&#123; first_name
              &#125;&#125; at &#123;&#123; company_name &#125;&#125;
              highlighting how we can help. Make it under 150 words and
              professional sounding."{" "}
            </i>
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            It can be that simple, or you can add extra context with our variety
            of personalization tags.
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            Position refers to which email in a sequence the instructions will
            be applied to, which gives you control over what you say and when.
            For example position 1 will generate the first email in a sequence.
          </Typography>
        </>
      ),
    },
    {
      label: "How the system learns: Materials",
      description:
        "CallSine digests and then pulls from the sales & marketing materials you provide it. Think of it as training your own personal AI model. ",
      content: () => (
        <>
          <Typography color="white" mt={2} mb={2}>
            You can easily add or delete Materials as you work on finetuning the
            system.
          </Typography>
          <Box
            component="img"
            src={materials}
            alt="Description"
            sx={{ width: 200, height: "auto" }}
          />
          <Typography color="white" mt={2} mb={2}>
            <b>Focus on feeding the system high value, simple content.</b> You
            are training your personal sales assistant on a very specific task,
            so start simple then add more in as you feel it needs.
          </Typography>
          <Typography ml={4} color="white" mt={2} mb={2}>
            <i>
              {" "}
              <b> More is not always better...</b> As a test, we asked ChatGPT
              with its Bing plugin analyze a user's website and write a single
              page document summarizing the company's value proposition,
              marketing positioning, and other high level details, then uploaded
              it to their Materials section.
              <br />
              <br />
              With this alone CallSine generated emails the user felt they could
              confidently send - no edits needed.
            </i>
          </Typography>
        </>
      ),
    },
    {
      label: "People: where CallSine works the hardest",
      description:
        "When you upload your prospects into the system, you can view them on the People screen. Once uploaded, CallSine goes to work finding and appending relevant data to be used in the personalization of your emails.",
      content: () => (
        <>
          <Typography color="white" mt={2} mb={2}>
            We recommend using our upload template that can be found when you
            click to Import People from the People screen. This will ensure all
            relevant data is brought in and{" "}
            <b>
              {" "}
              CallSine can do its thing uncovering the information that will
              result in truly personalized emails!
            </b>
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            For some people that you import, their data will be available
            instantly while others could take few hours as the system works.
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            But don't worry, most of your contacts will be available to generate
            messages for instantly.
          </Typography>

          <Typography color="white" mt={2} mb={2}>
            <i>
              {" "}
              Note: As with any CSV it is the column headers specifically as
              written in the template that are critical to a succesful People
              list upload.
            </i>
          </Typography>
          <Box
            component="img"
            src={importing}
            alt="Description"
            sx={{ width: 200, height: "auto" }}
          />
        </>
      ),
    },
    {
      label: "The exciting part: Email Generation",
      description:
        "To start quickly, you can simply use the Playbook we have created for you. In other words, experience the exciting part of CallSine as you learn how to do the rest!",
      content: () => (
        <>
          <Typography color="white" mt={2} mb={2}>
            In the onboarding wizard, you will have added your first target
            contact, some information about your company, and your first
            Materials.
          </Typography>
          <Typography color="white" mt={2} mb={2}>
            <b> Now it is time to generate... </b>
          </Typography>
          <Box
            component="img"
            src={people}
            alt="Description"
            sx={{ width: 200, height: "auto" }}
          />
          <Typography color="white" mt={2} mb={2}>
            To do so, simply select the person out of the People table by
            clicking on them, then click Generate Emails, select the playbook,
            and BAM! Your emails will start generating.
          </Typography>
          <Box
            component="img"
            src={image}
            alt="Description"
            sx={{ width: 200, height: "auto" }}
          />
          <Typography color="white" mt={2} mb={2}>
            Follow along with the instructions in the green bar that will appear
            on the screen to view your generated emails.
          </Typography>
        </>
      ),
    },
    {
      label: "If you need help...",
      description:
        "Click the CallSine logo in the bottom right of the screen and ask a question in natural language.",
      content: () => (
        <>
          <Typography color="white" mt={2} mb={2}>
            If you need additional assistance, you can access our support by
            using our live chat assistance found in the bottom left of the
            screen
          </Typography>

          <Box
            component="img"
            src={help}
            alt="Description"
            sx={{ width: 200, height: "auto" }}
          />
        </>
      ),
    },
    // Step 5

    // Additional steps, if any...
  ];

  return {
    steps,
    handleNext,
    handleBack,
    handleReset,
    activeStep,
    submitted,
  };
};

export { useTutorial };
