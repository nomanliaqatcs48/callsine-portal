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
import { devLogError } from "../../../../helpers/logs";

const Overview = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
  });

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    try {
      let res = await { data: [] };
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
        <Grid item xs={1} />
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="h5">Header</Typography>
                  </TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="h5">Header</Typography>
                  </TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  );
};

export default Overview;
