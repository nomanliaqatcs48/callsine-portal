import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getPersonDetailService,
  regeneratePlaybookService,
} from "../../../../services/persons.service";
import { devLogError } from "../../../../helpers/logs";
import { LoadingButton } from "@mui/lab";
import CopyClipboard from "../../../../ui-component/buttons/CopyClipboard";
import { usePlaybook } from "../hooks/usePlaybook";
import Prompts from "../../../../ui-component/dropdowns/Prompts";

const Playbook = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    regeneratePlaybook: false,
  });

  const {
    playbookOpen,
    setPlaybookOpen,
    handlePlaybookOpen,
    handlePlaybookClose,
    renderPlaybookModal,
  } = usePlaybook();

  useEffect(() => {
    getPersonDetail();
  }, [id]);

  const getPersonDetail = async () => {
    try {
      let res = await getPersonDetailService(Number(id));
      if (res?.data) {
        setData(res.data);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
      }
    } catch (e: any) {
      devLogError(e.response);
      setIsLoading((prev: any) => ({ ...prev, onPage: false }));
    }
  };

  const handleRegeneratePlaybook = async () => {
    setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: true }));

    try {
      let res = await regeneratePlaybookService(Number(id));
      if (res?.data) {
        setData(res.data);
        setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
      }
    } catch (e: any) {
      devLogError(e.response);
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
    }
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
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={handleClickEdit}
              >
                Edit
              </Button>

              <div style={{ width: 10 }} />

              <LoadingButton
                loading={isLoading?.regeneratePlaybook}
                disableElevation
                disabled={isLoading?.regeneratePlaybook}
                size="large"
                type="submit"
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
              <Prompts onChange={() => null} margin="none" size="small" />
            </>
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          {!isLoading?.onPage && (
            <>
              <LoadingButton
                loading={isLoading?.regeneratePlaybook}
                disableElevation
                // disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegeneratePlaybook}
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
        {!isLoading?.onPage && data.prompts.length === 0 && (
          <RenderEmptyPlaybook />
        )}
      </Grid>

      <Grid sx={{ height: 15 }} />

      <Grid container spacing={3}>
        <Grid item lg />
        <Grid item xs={12} lg={8}>
          {!isLoading?.onPage &&
            data.prompts.length > 0 &&
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
