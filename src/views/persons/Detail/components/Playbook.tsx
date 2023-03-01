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
  personDetailService,
  regeneratePlaybookService,
} from "../../../../services/persons.service";
import { devLog, devLogError } from "../../../../helpers/logs";
import { LoadingButton } from "@mui/lab";
import xss from "xss";
import CopyClipboard from "../../../../ui-component/buttons/CopyClipboard";
import { usePlaybook } from "../hooks/usePlaybook";

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
      let res = await personDetailService(Number(id));
      if (res?.data) {
        setData(res.data);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
        setTimeout(() => {
          // handlePreviewPlaybook(res.data?.playbook?.pitch, ".sales_pitch");
          // handlePreviewPlaybook(res.data?.playbook?.followup, ".follow_up");
        });
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
        setTimeout(() => {
          // handlePreviewPlaybook(res.data?.playbook?.pitch, ".sales_pitch");
          // handlePreviewPlaybook(res.data?.playbook?.followup, ".follow_up");
        });
      }
    } catch (e: any) {
      devLogError(e.response);
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
    }
  };

  /*const handlePreviewPlaybook = (data: any, elClass: string) => {
    devLog("data elClass", elClass, data);
    let _preview: any = document.querySelector(elClass);
    if (_preview) {
      devLog("_preview", _preview);
      if (data) {
        setTimeout(() => {
          _preview.innerHTML = xss(data);
        }, 500);
      } else {
        setTimeout(() => {
          _preview.innerHTML = "";
        }, 200);
      }
    }
  };*/

  const RenderCard = ({
    header,
    content,
    class_name,
    handleClickEdit,
  }: any) => {
    return (
      <Paper elevation={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {header}
              </Typography>

              <CopyClipboard copyContent={content} onClick={() => null} />
            </Grid>

            <Typography
              variant="body2"
              className={class_name}
              style={{ whiteSpace: "pre-line" }}
            >
              {content}
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
                {!(data?.playbook?.pitch && data?.playbook?.followup)
                  ? "Generate"
                  : "Regenerate"}{" "}
                Playbook
              </LoadingButton>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    );
  };

  return (
    <>
      {/*<Grid container spacing={3}>
        <Grid item xs />
        <Grid item xs={6}>
          {!isLoading?.onPage && (
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
              {!(data?.playbook?.pitch && data?.playbook?.followup)
                ? "Generate"
                : "Regenerate"}{" "}
              Playbook
            </LoadingButton>
          )}
        </Grid>
        <Grid item xs />
      </Grid>*/}

      <Grid sx={{ height: 15 }} />

      <Grid container spacing={3}>
        {!isLoading?.onPage &&
          data?.playbook?.pitch &&
          data?.playbook?.followup && (
            <>
              <Grid item lg />
              <Grid item xs={12} lg={8}>
                <RenderCard
                  header="Sales Pitch"
                  content={data?.playbook?.pitch}
                  class_name="sales_pitch"
                  handleClickEdit={() => null}
                />

                <Grid sx={{ height: 20 }} />

                <RenderCard
                  header="Follow up"
                  content={data?.playbook?.followup}
                  class_name="follow_up"
                  handleClickEdit={() => null}
                />
              </Grid>
              <Grid item lg />
            </>
          )}
      </Grid>
    </>
  );
};

export default Playbook;
