import React, { useState } from "react";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useEmailsTab } from "../../../../hooks/persons/useEmailsTab";
import xss from "xss";

const Emails = () => {
  let {
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
    getAllCampaignSteps,
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
                          <strong>Date Created:</strong> {o?.created_date}
                        </Typography>
                      </div>
                      <div>
                        {/*<CreateOrEditStep
                          btnText="Edit Step"
                          id={o?.email_template?.id}
                          defaultValue={o}
                          onClick={() => null}
                          onSubmit={getAllCampaignSteps}
                        />*/}
                      </div>
                    </Grid>

                    <div style={{ height: 10 }} />

                    <div className={`preview_${o?.id}`} />
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
