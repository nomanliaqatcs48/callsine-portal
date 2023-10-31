import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { EditableProperty } from "./EditableProperty";
import StatusDropdown from "./StatusDropdown";

type ProfileSecondColTypes = {
  data: any;
  editMode?: boolean;
};

const ProfileSecondCol = ({
  data,
  editMode = false,
}: ProfileSecondColTypes) => {
  console.log("PERSON", data);

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
        data?.person_city && data?.state
          ? `${data?.person_city}${data?.state ? ", " + data.state : ""}`
          : "n/a",
      value: {
        person_city: data?.person_city,
        state: data?.state,
      },
    },
    {
      key: "org.industry",
      first: "Industry",
      second: data?.org?.industry || "n/a",
      value: data?.org?.industry,
    },

    // {
    //   key: "work_email",
    //   first: "Email",
    //   second: data?.work_email ? (
    //     <Button
    //       href={`mailto:${data?.work_email}`}
    //       className="tw-p-0 tw-normal-case tw-font-normal tw-text-callsineLightBlue tw-text-[16px]"
    //     >
    //       {data?.work_email}
    //     </Button>
    //   ) : (
    //     "n/a"
    //   ),
    //   value: data?.work_email,
    // },
    {
      key: "phone",
      first: "Phone",
      second: data?.phone || "n/a",
      value: data?.phone,
    },
    {
      first: "Status",
      second: <StatusDropdown status={data?.status} id={data?.id} />,
    },
  ];

  const [active, setActive] = useState("");

  return (
    <>
      <TableContainer component={Paper} className="tw-rounded-[0px]">
        <Table>
          <TableBody>
            {items.map((item, idx) => {
              let itemKey = `${item.first}-${item.second}`;
              let isActive = itemKey === active;
              console.log(idx);
              return (
                <TableRow
                  key={idx}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  className={`hover:tw-bg-[#0000000a] tw-rounded-[0px] ${
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

                  {idx != 5 ? (
                    <EditableProperty
                      personId={data?.id}
                      editMode={editMode}
                      item={item}
                      isActive={isActive}
                      onClick={() => setActive(itemKey)}
                    />
                  ) : (
                    item.second
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
