import React, { useState } from "react";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { devLogError } from "../../../../helpers/logs";
import { LoadingButton } from "@mui/lab";
import CopyClipboard from "../../../../ui-component/buttons/CopyClipboard";
import Prompts from "../../../../ui-component/dropdowns/Prompts";
import { usePlaybook } from "../../../../hooks/persons/usePlaybook";
import {
  createResponsesService,
  generateResponsesService,
} from "../../../../services/prompts.service";

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

        //reset prompt
        setIsLoading((prev: any) => ({ ...prev, resetPrompt: true }));
        setTimeout(() =>
          setIsLoading((prev: any) => ({ ...prev, resetPrompt: false }))
        );
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

  const RenderCard = ({ promptItem, handleClickEdit }: any) => {
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const regeneratePlaybook = async () => {
      setIsBtnLoading(true);
      try {
        let res = await generateResponsesService(
          Number(promptItem?.id),
          Number(id)
        );
        if (res?.data) {
          let _prompts = data.prompts.map((item: any) => {
            if (item?.id === promptItem?.id) {
              item = res?.data;
            }
            setData((prev: any) => {
              let prompts = _prompts;
              return { ...prev, prompts };
            });
            return item;
          });
          setIsBtnLoading(false);
        }
      } catch ({ response }) {
        devLogError(response);
        setIsBtnLoading(false);
      }
    };

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
              <CopyClipboard
                copyContent={promptItem?.text}
                onClick={() => null}
              />
            </Grid>

            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
              {promptItem?.text}
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
                loading={isLoading?.regeneratePlaybook || isBtnLoading}
                disableElevation
                disabled={isLoading?.regeneratePlaybook || isBtnLoading}
              >
                Send as Email
              </LoadingButton>

              <div style={{ width: 10 }} />

              <LoadingButton
                loading={isLoading?.regeneratePlaybook || isBtnLoading}
                disableElevation
                disabled={isLoading?.regeneratePlaybook || isBtnLoading}
                size="large"
                type="button"
                variant="contained"
                color="primary"
                onClick={regeneratePlaybook}
              >
                Regenerate Playbook
              </LoadingButton>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs />
        <Grid item xs={12} md={5}>
          {!isLoading?.resetPrompt && (
            <Prompts
              onChange={handlePromptOnChange}
              margin="none"
              size="small"
            />
          )}
        </Grid>
        <Grid item xs={12} md={5}>
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
        </Grid>
        <Grid item xs />
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
                    promptItem={o}
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
