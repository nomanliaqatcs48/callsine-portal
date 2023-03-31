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
                          <Tooltip
                            title={moment.utc(o?.created_date).format("LLLL")}
                            placement="top"
                          >
                            <span>
                              {moment.utc(o?.created_date).format("L")}
                            </span>
                          </Tooltip>
                        </Typography>
                      </div>
                    </Grid>

                    <div style={{ height: 10 }} />

                    <Typography
                      variant="body2"
                      className={`preview_${o?.id}`}
                    />

                    <div style={{ height: 10 }} />

                    <Grid
                      container
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                    >
                      <SendEmailNow id={o?.id} buttonText="Send Now" />

                      <div style={{ marginRight: 10 }} />

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
