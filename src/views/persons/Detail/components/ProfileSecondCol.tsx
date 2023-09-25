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
import { EditableProperty } from "./EditableProperty";

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
      key: "job_title",
      first: "Title",
      second: data?.job_title || "n/a",
      value: data?.job_title,
    },
    {
      key: "org.name",
      first: "Company",
      second: data?.org?.name || "n/a",
      value: data?.org?.name,
    },
    {
      key: "address",
      first: "Location",
      second:
        data?.city && data?.state
          ? `${data?.city}${data?.state ? ", " + data.state : ""}`
          : "n/a",
      value: {
        city: data?.city,
        state: data?.state,
      },
    },
    {
      key: "org.industry",
      first: "Industry",
      second: data?.org?.industry || "n/a",
      value: data?.org?.industry,
    },
    {
      key: "work_email",
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
      value: data?.work_email,
    },
    {
      key: "phone",
      first: "Phone",
      second: data?.phone || "n/a",
      value: data?.phone,
    },
  ];

  const [active, setActive] = useState("");

  return (
    <>
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
                  className={`hover:tw-bg-[#0000000a] ${
                    isActive ? "tw-bg-[#0000000a]" : ""
                  }`}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="tw-font-normal tw-uppercase tw-text-[14px] tw-tracking-[0.28px] tw-text-callsineTextGray tw-border-b-0 tw-p-2"
                  >
                    {item.first}
                  </TableCell>

                  <EditableProperty
                    editMode={editMode}
                    item={item}
                    isActive={isActive}
                    onClick={() => setActive(itemKey)}
                  />
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
