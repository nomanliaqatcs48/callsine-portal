import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

type ProfileSecondColTypes = {
  data: any;
};

const ProfileSecondCol = ({ data }: ProfileSecondColTypes) => {
  const items = [
    {
      first: "Title",
      second: data?.job_title || <hr className="tw-w-3 tw-border-black" />,
    },
    {
      first: "Company",
      second: data?.org?.name || <hr className="tw-w-3 tw-border-black" />,
    },
    {
      first: "Location",
      second:
        data?.city && data?.state ? (
          `${data?.city}${data?.state ? ", " + data.state : ""}`
        ) : (
          <hr className="tw-w-3 tw-border-black" />
        ),
    },
    {
      first: "Industry",
      second: data?.org?.industry || <hr className="tw-w-3 tw-border-black" />,
    },
    {
      first: "Email",
      second: data?.work_email ? (
        <Button
          href={`mailto:${data?.work_email}`}
          className="tw-p-0 tw-normal-case tw-font-normal tw-text-callsineLightBlue tw-text-[16px]"
        >
          {data?.work_email}
        </Button>
      ) : (
        <hr className="tw-w-3 tw-border-black" />
      ),
    },
    {
      first: "Phone",
      second: data?.phone || <hr className="tw-w-3 tw-border-black" />,
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
                    className="tw-font-normal tw-uppercase tw-text-[14px] tw-tracking-[0.28px] tw-text-callsineTextGray tw-border-b-0 tw-p-2"
                  >
                    {item.first}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="tw-text-left tw-text-black tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-border-b-0 tw-p-2"
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
