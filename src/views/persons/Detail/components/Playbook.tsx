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

const Playbook = () => {
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
      devLog(res);
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
      devLog(res);
      if (res?.data) {
        setData(res.data);
        setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
      }
    } catch (e: any) {
      devLogError(e.response);
      setIsLoading((prev: any) => ({ ...prev, regeneratePlaybook: false }));
    }
  };

  const RenderCard = ({ header, content }: any) => {
    return (
      <Paper elevation={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {header}
            </Typography>
            <Typography variant="body2">{content}</Typography>
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
              />

              <div style={{ height: 15 }} />

              <RenderCard
                header="Follow up"
                content={data?.playbook?.followup}
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
