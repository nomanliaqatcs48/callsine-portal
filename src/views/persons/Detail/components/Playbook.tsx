import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { devLogError } from "../../../../helpers/logs";
import { LoadingButton } from "@mui/lab";
import CopyClipboard from "../../../../ui-component/buttons/CopyClipboard";
import Prompts from "../../../../ui-component/dropdowns/Prompts";
import { usePlaybook } from "../../../../hooks/persons/usePlaybook";
import { createResponsesService } from "../../../../services/prompts.service";

const Playbook = () => {
  const { id } = useParams();
  const [promptId, setPromptId] = useState<number | null>(null);

  const {
    data,
    setData,
    playbookOpen,
    setPlaybookOpen,
    isLoading,
    setIsLoading,
    getPersonDetail,
    handlePlaybookOpen,
    handlePlaybookClose,
    renderPlaybookModal,
    handlePreview,
  } = usePlaybook();

  const handleGeneratePlaybook = async () => {
    setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: true }));

    try {
      let res = await createResponsesService(Number(promptId), Number(id), {
        first_name: data?.first_name,
        last_name: data?.last_name,
        company_name: data?.org?.name,
        company_domain: data?.org?.domain,
        org_name: "Union Resolute",
        org_domain: "unionresolute.com",
      });
      if (res?.data) {
        setData(res.data);
        getPersonDetail();
        setPromptId(null);
        setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
      }
    } catch (e: any) {
      devLogError(e.response);
      setPromptId(null);
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
    }
  };

  const handlePromptOnChange = (promptId: number) => {
    setPromptId(promptId);
  };

  const RenderCard = ({ data, handleClickEdit }: any) => {
    return (
      <Paper elevation={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="end"
              alignItems="center"
            >
              <CopyClipboard copyContent={data?.text} onClick={() => null} />
            </Grid>

            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
              {data?.text}
            </Typography>

            <Grid sx={{ height: 20 }} />

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <LoadingButton
                variant="outlined"
                size="large"
                color="primary"
                onClick={handleClickEdit}
                loading={isLoading?.regeneratePlaybook}
                disableElevation
                disabled={isLoading?.regeneratePlaybook}
              >
                Edit
              </LoadingButton>

              <div style={{ width: 10 }} />

              <LoadingButton
                loading={isLoading?.regeneratePlaybook}
                disableElevation
                disabled={isLoading?.regeneratePlaybook}
                size="large"
                type="button"
                variant="contained"
                color="primary"
                onClick={() => null}
              >
                Regenerate Playbook
              </LoadingButton>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    );
  };

  const RenderEmptyPlaybook = () => {
    return (
      <>
        <Grid item xs />
        <Grid item xs={12} md={5}>
          {!isLoading?.onPage && (
            <>
              <Prompts
                onChange={handlePromptOnChange}
                margin="none"
                size="small"
              />
            </>
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          {!isLoading?.onPage && (
            <>
              <LoadingButton
                loading={isLoading?.regeneratePlaybook}
                disableElevation
                disabled={!promptId}
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleGeneratePlaybook}
              >
                Generate Playbook
              </LoadingButton>
            </>
          )}
        </Grid>
        <Grid item xs />
      </>
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <RenderEmptyPlaybook />
      </Grid>

      <Grid sx={{ height: 15 }} />

      <Grid container spacing={3}>
        <Grid item lg />
        <Grid item xs={12} lg={8}>
          {!isLoading?.onPage &&
            data.prompts?.length > 0 &&
            data.prompts.map((o: any, idx: number) => {
              return (
                <>
                  <RenderCard
                    data={o}
                    handleClickEdit={() => {
                      handlePlaybookOpen();
                    }}
                  />
                  <Grid sx={{ height: 20 }} />
                </>
              );
            })}
        </Grid>
        <Grid item lg />
      </Grid>

      {playbookOpen && renderPlaybookModal(data)}
    </>
  );
};

export default Playbook;
