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
import React from "react";

const Overview = () => {
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
