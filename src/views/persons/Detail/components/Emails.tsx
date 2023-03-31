import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEmailsTab } from "../../../../hooks/persons/useEmailsTab";
import xss from "xss";
import DeletePersonEmail from "../../../../ui-component/buttons/DeletePersonEmail";
import moment from "moment";
import SendEmailNow from "../../../../ui-component/buttons/SendEmailNow";

const Emails = () => {
  let {
    id: personId,
    emails,
    setEmails,
    total,
    setTotal,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    getEmails,
    showStatus,
  } = useEmailsTab();

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 1, lg: 2 },
        margin: "auto",
        flexGrow: 1,
        backgroundColor: (theme) => "#e7ebf0",
      }}
      style={{
        minHeight: 800,
        height: 800,
        overflowY: "auto",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={8}>
          {!isLoading?.onPage &&
            emails?.length > 0 &&
            emails.map((o, idx) => {
              setTimeout(() => {
                let _preview: any = document.querySelector(`.preview_${o?.id}`);
                let _htmlMsg = o?.html_message;
                if (_preview && _htmlMsg) {
                  _preview.innerHTML = xss(_htmlMsg);
                }
              }, 500);

              return (
                <Card key={idx} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div>
                        <Typography variant="subtitle2">
                          <strong>Subject:</strong> {o?.subject}
                        </Typography>
                        <Typography variant="subtitle2">
                          <strong>To:</strong>{" "}
                          {o?.to ? <a href={`mailto:${o.to}`}>{o.to}</a> : ""}
                        </Typography>
                        <Typography variant="subtitle2">
                          <strong>Date Created:</strong>{" "}
                          {moment.utc(o?.created_date).format("LLLL")}
                        </Typography>
                        <Typography variant="subtitle2">
                          <strong>Status:</strong> {showStatus(o?.status)}
                        </Typography>
                      </div>
                    </Grid>

                    <div style={{ height: 10 }} />

                    <Typography
                      variant="body2"
                      className={`preview_${o?.id}`}
                    />

                    <div style={{ height: 50 }} />

                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          <strong>Scheduled Time:</strong>{" "}
                          {moment(o?.scheduled_time).format("LLLL")}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                    >
                      {showStatus(o?.status) === "Queued" && (
                        <SendEmailNow
                          id={o?.id}
                          buttonText="Send Now"
                          style={{ marginRight: 10 }}
                        />
                      )}

                      <DeletePersonEmail
                        buttonText="Delete"
                        id={o?.id}
                        personId={Number(personId)}
                        onLoadApi={getEmails}
                      />
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}

          {!isLoading?.onPage && !emails?.length && (
            <div style={{ textAlign: "center" }}>Data not available.</div>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Emails;
