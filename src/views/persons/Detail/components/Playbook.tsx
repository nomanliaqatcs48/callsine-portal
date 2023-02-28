import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonBase,
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
import { IconCopy } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

const Playbook = () => {
  const theme: any = useTheme();
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    regeneratePlaybook: false,
  });

  useEffect(() => {
    getPersonDetail();
  }, []);

  const getPersonDetail = async () => {
    try {
      let res = await personDetailService(Number(id));
      if (res?.data) {
        setData(res.data);
        setIsLoading((prev: any) => ({ ...prev, onPage: false }));
        setTimeout(() => {
          handlePreviewPlaybook(res.data?.playbook?.pitch, ".sales_pitch");
          handlePreviewPlaybook(res.data?.playbook?.followup, ".follow_up");
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
          handlePreviewPlaybook(res.data?.playbook?.pitch, ".sales_pitch");
          handlePreviewPlaybook(res.data?.playbook?.followup, ".follow_up");
        });
      }
    } catch (e: any) {
      devLogError(e.response);
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
    }
  };

  const handlePreviewPlaybook = (data: any, elClass: string) => {
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
  };

  const RenderCard = ({ header, content, class_name }: any) => {
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

              <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: "all .2s ease-in-out",
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    "&:hover": {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light,
                    },
                  }}
                  onClick={() => null}
                  color="inherit"
                >
                  <IconCopy stroke={1.5} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Grid>
            <Typography
              variant="body2"
              className={class_name}
              style={{ whiteSpace: "pre-line" }}
            />
          </CardContent>
        </Card>
      </Paper>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs />
      <Grid item xs={6}>
        {!isLoading?.onPage &&
          data?.playbook?.pitch &&
          data?.playbook?.followup && (
            <>
              <RenderCard
                header="Sales Pitch"
                content={data?.playbook?.pitch}
                class_name="sales_pitch"
              />

              <div style={{ height: 15 }} />

              <RenderCard
                header="Follow up"
                content={data?.playbook?.followup}
                class_name="follow_up"
              />
            </>
          )}

        {!isLoading?.onPage &&
          !(data?.playbook?.pitch && data?.playbook?.followup) && (
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
              Regenerate Playbook
            </LoadingButton>
          )}
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Playbook;
