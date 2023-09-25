import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { devLog } from "src/helpers/logs";

type ProfileSecondColTypes = {
  data: any;
  editMode?: boolean;
};

const ProfileSecondCol = ({
  data,
  editMode = false,
}: ProfileSecondColTypes) => {
  const items = [
    {
      first: "Title",
      second: data?.job_title || "n/a",
    },
    {
      first: "Company",
      second: data?.org?.name || "n/a",
    },
    {
      first: "Location",
      second:
        data?.city && data?.state
          ? `${data?.city}${data?.state ? ", " + data.state : ""}`
          : "n/a",
    },
    {
      first: "Industry",
      second: data?.org?.industry || "n/a",
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
        "n/a"
      ),
    },
    {
      first: "Phone",
      second: data?.phone || "n/a",
    },
  ];

  const [active, setActive] = useState("");

  // const handleSave = (key, value) => {};

  return (
    <>
      <style>{`
        tr td:last-child {
          background-color: transparent !important;
        }
      `}</style>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {items.map((item, idx) => {
              let itemKey = `${item.first}-${item.second}`;
              let isActive = itemKey === active;
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
                    className="tw-text-left tw-text-black tw-font-normal tw-text-[16px] tw-tracking-[0.32px] tw-border-b-0 tw-p-0"
                    contentEditable={editMode}
                    onClick={() => setActive(itemKey)}
                  >
                    {item.second}
                  </TableCell>

                  {editMode && isActive && (
                    <TableCell
                      align="right"
                      className="tw-w-[40px] tw-border-0 hover:tw-bg-transparent"
                    >
                      <Button>Save</Button>
                    </TableCell>
                  )}
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
