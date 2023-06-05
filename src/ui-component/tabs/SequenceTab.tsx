import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import { useFetchProspectSequenceEvent } from "../../hooks/persons/useProspectEvents";
import React, { useState } from "react";
import { generateResponsesService } from "../../services/prompts.service";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { LoadingButton } from "@mui/lab";
import CopyClipboard from "../buttons/CopyClipboard";
import _ from "lodash";
import CreateEmail from "../buttons/CreateEmail";
import { devLogError } from "../../helpers/logs";

interface PromptResponse {
  context: any; // replace 'any' with the actual type of context
  prompt: any; // replace 'any' with the actual type of prompt
  text: string;
  // add other properties of the PromptResponse model here if needed
}

interface Email {
  message_id: string;
  draft_id: string;
  thread_id: string;
  in_reply_to: Email | null;
  from_email: any; // replace 'any' with the actual type of from_email
  to: string;
  subject: string;
  message: string;
  html_message: string;
  status: number;
  headers: any; // replace 'any' with the actual type of headers
  context: any; // replace 'any' with the actual type of context
  scheduled_time: string;
  opens: number;
  clicks: number;
  failed_reason: string | null;
  // add other properties of the Email model here if needed
}

interface ProspectSequenceEvent {
  position: number;
  promptResponse: PromptResponse | null;
  scheduledEmails: Email[] | null;
  // add other properties of the ProspectSequenceEvent model here if needed
}

const SequenceTab = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchProspectSequenceEvent(String(id));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(id);
  console.log(loading);
  console.log(error);
  console.log(data);

  // const RenderCard = ({ promptItem }: any) => {
  //   const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  //   const regeneratePlaybook = async () => {
  //     setIsBtnLoading(true);
  //     try {
  //       let res = await generateResponsesService(
  //         Number(promptItem?.id),
  //         Number(id)
  //       );
  //       if (res?.data) {
  //         ToastSuccess("Message successfully regenerated.");
  //         let _prompts = data.prompts.map((item: any) => {
  //           if (item?.id === promptItem?.id) {
  //             item = res?.data;
  //           }
  //           setData((prev: any) => {
  //             let prompts = _prompts;
  //             return { ...prev, prompts };
  //           });
  //           return item;
  //         });
  //         setIsBtnLoading(false);
  //       }
  //     } catch ({ response }) {
  //       ToastError("Something went wrong!");
  //       devLogError(response);
  //       setIsBtnLoading(false);
  //     }
  //   };

  //   return (
  //     <Paper elevation={3}>
  //       <Card sx={{ minWidth: 275 }}>
  //         <CardContent>
  //           <Grid
  //             container
  //             direction="row"
  //             justifyContent="end"
  //             alignItems="center"
  //           >
  //             <CopyClipboard
  //               copyContent={promptItem?.text}
  //               onClick={() => null}
  //             />
  //           </Grid>

  //           <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
  //             {promptItem?.text}
  //           </Typography>

  //           <Grid sx={{ height: 20 }} />

  //           <Grid
  //             container
  //             direction="row"
  //             justifyContent="flex-end"
  //             alignItems="center"
  //           >
  //             <CreateEmail
  //               html_message={promptItem?.text}
  //               handleEditorPreview={() => null}
  //               buttonText="Create Email"
  //               variant="outlined"
  //               size="large"
  //               color="primary"
  //               loading={isLoading?.regeneratePlaybook || isBtnLoading}
  //               disableElevation
  //               disabled={isLoading?.regeneratePlaybook || isBtnLoading}
  //             />

  //             <div style={{ width: 10 }} />

  //             <LoadingButton
  //               loading={isLoading?.regeneratePlaybook || isBtnLoading}
  //               disableElevation
  //               disabled={isLoading?.regeneratePlaybook || isBtnLoading}
  //               size="large"
  //               type="button"
  //               variant="outlined"
  //               color="primary"
  //               onClick={regeneratePlaybook}
  //             >
  //               Regenerate Message
  //             </LoadingButton>
  //           </Grid>
  //         </CardContent>
  //       </Card>
  //     </Paper>
  //   );
  // };

  const instruction = (item: ProspectSequenceEvent) => {
    if (!item.promptResponse && !item.scheduledEmails) {
      return "Run a playbook to generate emails";
    } else if (item.scheduledEmails) {
      return "Email Scheduled";
    } else if (item.promptResponse) {
      return "Pick one of the response prompts to create an email";
      // <React.Fragment key={idx}>
      //   <RenderCard promptItem={o} />
      //   <Grid sx={{ height: 20 }} />
      // </React.Fragment>
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {data?.results.map((item: ProspectSequenceEvent, index: number) => {
            if (index + 1 === item.position) {
              return (
                <>
                  {" "}
                  <Typography> Email: {item.position}</Typography>
                  {instruction(item)}
                </>
              );
            }
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default SequenceTab;
