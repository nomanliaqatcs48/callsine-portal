import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { devLog, devLogError } from "../../../../helpers/logs";
import { personDetailService } from "../../../../services/persons.service";
import { useParams } from "react-router-dom";

const Overview = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <RenderTableItem header="First Name" value={data?.first_name} />
                <RenderTableItem header="Last Name" value={data?.last_name} />
                <RenderTableItem header="Job Title" value={data?.job_title} />
                <RenderTableItem
                  header="Work Email"
                  value={
                    <a
                      href={`mailto:${data?.work_email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.work_email}
                    </a>
                  }
                />
                <RenderTableItem
                  header="Personal Email"
                  value={
                    <a
                      href={`mailto:${data?.personal_email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.personal_email}
                    </a>
                  }
                />
                <RenderTableItem
                  header="Linkedin"
                  value={
                    <a
                      href={`${data?.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data?.linkedin}
                    </a>
                  }
                />
                <RenderTableItem
                  header="Email Domain"
                  value={data?.email_domain}
                />
                <RenderTableItem header="City" value={data?.city} />
                <RenderTableItem header="State" value={data?.state} />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Overview;

export const RenderTableItem = ({ header, value }: any) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Typography variant="h5">{header}</Typography>
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};
