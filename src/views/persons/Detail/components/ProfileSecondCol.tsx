import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

type ProfileSecondColTypes = {
  data: any[];
};

const ProfileSecondCol = ({ data }: ProfileSecondColTypes) => {
  const items = [
    {
      first: "Title",
      second: "Co-Founder and CEO",
    },
    {
      first: "Company",
      second: "Google",
    },
    {
      first: "Location",
      second: "San Ramon, CA",
    },
    {
      first: "Industry",
      second: "Artificial Intelligence Advertising Cloud",
    },
    {
      first: "Email",
      second: "johndoe@gmail.com",
    },
    {
      first: "Phone",
      second: "(555) 555-1234",
    },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {items.map((item, idx) => {
              return (
                <TableRow
                  key={idx}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  className="hover:tw-bg-[#0000000a]"
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="tw-font-thin tw-uppercase tw-text-[0.65rem] tw-border-b-0 tw-p-2"
                  >
                    {item.first}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="tw-text-left tw-text-black tw-font-medium tw-text-[0.85rem] tw-border-b-0 tw-p-2"
                  >
                    {item.second}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfileSecondCol;
