import moment from "moment";
import { useTheme } from "@mui/material/styles";
import React from "react";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import { ReactComponent as UserIcon } from "../../../assets/images/svg/user.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/images/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/images/svg/linkedin.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { devLog } from "../../../helpers/logs";
import DeletePerson from "../../../ui-component/buttons/DeletePerson";

export const _columns: any = () => {
  const theme: any = useTheme();

  const ListItemCustom = ({ icon, text }: any) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar className="tw-bg-[#eaeaea] tw-scale-90">{icon}</Avatar>
        </ListItemAvatar>
        {text}
      </ListItem>
    );
  };

  return [
    {
      Header: "Name",
      accessor: "first_name",
      Cell: (cell: any) => {
        const listItems = [
          {
            //name
            icon: (
              <PersonOutlineOutlinedIcon
                className="tw-opacity-80"
                fontSize="small"
                sx={{ color: "#151515" }}
              />
            ),
            text: (
              <span className="tw-opacity-90 tw-text-sm tw-font-medium">
                {cell?.value || ""} {cell?.row?.original?.last_name || ""}
              </span>
            ),
          },
          {
            //phone
            icon: (
              <LocalPhoneOutlinedIcon
                className="tw-opacity-80"
                fontSize="small"
                sx={{ color: "#151515" }}
              />
            ),
            text: (
              <span className="tw-opacity-90 tw-text-sm tw-font-medium">
                {cell?.row?.original?.phone || "-"}
              </span>
            ),
          },
          {
            //email
            icon: (
              <AlternateEmailOutlinedIcon
                className="tw-opacity-80"
                fontSize="small"
                sx={{ color: "#151515" }}
              />
            ),
            text: (
              <span className="tw-opacity-90 tw-text-sm tw-font-medium">
                {cell?.row?.original?.work_email ? (
                  <a
                    href={`mailto:${cell?.row?.original?.work_email}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {cell?.row?.original?.work_email}
                  </a>
                ) : (
                  "-"
                )}
              </span>
            ),
          },
          {
            //job title
            icon: (
              <BusinessOutlinedIcon
                className="tw-opacity-80"
                fontSize="small"
                sx={{ color: "#151515" }}
              />
            ),
            text: (
              <span className="tw-opacity-90 tw-text-sm tw-font-medium">
                {cell?.row?.original?.job_title}
              </span>
            ),
          },
          {
            //address
            icon: (
              <FmdGoodOutlinedIcon
                className="tw-opacity-80"
                fontSize="small"
                sx={{ color: "#151515" }}
              />
            ),
            text: (
              <span className="tw-opacity-90 tw-text-sm tw-font-medium">
                {`${cell?.row?.original?.city || ""}${
                  cell?.row?.original?.state
                    ? ", " + cell?.row?.original?.state
                    : ""
                }`}

                {!cell?.row?.original?.city && !cell?.row?.original?.state
                  ? "-"
                  : ""}
              </span>
            ),
          },
        ];

        const clickFacebook = (url: string | URL | undefined) => {
          if (url) {
            window.open(url, "_blank");
          }
        };

        const clickLinkedin = (url: string | URL | undefined) => {
          if (url) {
            window.open(url, "_blank");
          }
        };

        return (
          <div className="">
            {cell?.value && (
              <Tooltip
                enterDelay={1000}
                leaveDelay={200}
                title={
                  <>
                    {/*icon and name*/}
                    <div className="tw-flex tw-justify-center tw-items-center tw-gap-x-5">
                      <div className="tw-relative tw-w-8 tw-h-8 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                        <UserIcon className="tw-absolute tw-w-8 tw-h-8 tw-text-gray-400" />
                      </div>
                      <div>
                        <span className="tw-font-bold tw-text-[0.80rem]">
                          {cell?.value || ""}{" "}
                          {cell?.row?.original?.last_name || ""}
                        </span>
                        <div className="tw-text-[#1ea3ce] tw-text-sm tw-font-normal">
                          {cell?.row?.original?.work_email ? (
                            <a
                              href={`mailto:${cell?.row?.original?.work_email}`}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="hover:tw-text-[#1ea3ce]"
                            >
                              {cell?.row?.original?.work_email}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                    </div>
                    {/*social icons*/}
                    <div className="tw-flex tw-justify-center tw-items-center tw-gap-6 tw-pt-5 tw-pb-3">
                      <Tooltip
                        title={
                          cell?.row?.original?.linkedin
                            ? "Linkedin"
                            : "No linkedin url yet"
                        }
                      >
                        <div
                          onClick={() =>
                            clickLinkedin(cell?.row?.original?.linkedin)
                          }
                          className={`${
                            cell?.row?.original?.linkedin
                              ? "tw-cursor-pointer"
                              : "tw-cursor-not-allowed"
                          } tw-py-[9px] tw-px-[8px] tw-w-[28px] tw-bg-[#4465a8] tw-rounded-full tw-scale-110`}
                        >
                          <LinkedinIcon style={{ fill: "white" }} />
                        </div>
                      </Tooltip>
                      <Tooltip
                        title={
                          cell?.row?.original?.facebook
                            ? "Facebook"
                            : "No facebook url yet"
                        }
                      >
                        <div
                          onClick={() =>
                            clickFacebook(cell?.row?.original?.facebook)
                          }
                          className={`${
                            cell?.row?.original?.facebook
                              ? "tw-cursor-pointer"
                              : "tw-cursor-not-allowed"
                          } tw-py-[8px] tw-px-[11px] tw-w-[28px] tw-bg-[#1677f2] tw-rounded-full tw-scale-110`}
                        >
                          <FacebookIcon style={{ fill: "white" }} />
                        </div>
                      </Tooltip>
                    </div>
                    {/*list*/}
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        bgcolor: "background.paper",
                      }}
                    >
                      {listItems.map((item, idx) => {
                        return (
                          <React.Fragment key={idx}>
                            <Divider variant="fullWidth" />
                            <ListItemCustom icon={item.icon} text={item.text} />
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </>
                }
                componentsProps={{
                  popper: {
                    sx: {
                      "&.MuiTooltip-popper": {
                        borderRadius: "0.5rem",
                        "& .MuiTooltip-tooltip": {
                          backgroundColor: theme.palette.common.white,
                          color: "rgba(0, 0, 0, 0.87)",
                          borderRadius: "0.75rem",
                          boxShadow: theme.shadows[1],
                          fontSize: 11,
                          paddingY: 2,
                          paddingX: 0,
                          width: 351,
                          maxWidth: 351,
                        },
                      },
                    },
                  },
                }}
              >
                <Button
                  variant="text"
                  className="tw-flex tw-items-center tw-gap-2 tw-text-inherit tw-text-[0.75rem] tw-leading-4 tw-no-underline hover:tw-bg-transparent text"
                  href={`/people/${cell?.row?.original?.id}`}
                >
                  <div className="tw-relative tw-w-7 tw-h-7 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                    <UserIcon className="tw-absolute tw-w-7 tw-h-7 tw-text-gray-400" />
                  </div>
                  {cell?.value || ""} {cell?.row?.original?.last_name || ""}
                </Button>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      Header: "Title",
      accessor: "job_title",
    },
    {
      Header: "Company",
      accessor: "org.name",
    },
    {
      Header: "Phone",
      accessor: "phone",
      Cell: (cell: any) => {
        return <span>{cell?.value || "-"}</span>;
      },
    },
    {
      Header: "Email",
      accessor: "work_email",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        return (
          <a
            href={`mailto:${cell?.value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tw-text-[#0096c7] hover:tw-text-[#0096c7]"
          >
            {cell?.value}
          </a>
        );
      },
    },
    {
      Header: "Location",
      accessor: "city",
      Cell: (cell: any) => {
        return `${cell?.row?.original?.city || ""}${
          cell?.row?.original?.state ? ", " + cell?.row?.original?.state : ""
        }`;
      },
    },
    {
      Header: "Industry",
      accessor: "org.industry",
      Cell: (cell: any) => {
        return cell?.value || "-";
      },
    },
    {
      Header: "Actions",
      disableSortBy: true,
      accessor: "actions",
      Cell: (cell: any) => {
        return (
          <>
            <DeletePerson id={cell?.row?.original?.id}>
              <IconTrash
                style={{ color: theme.palette.primary.main }}
                size="15"
                strokeWidth={3}
                className=""
              />
            </DeletePerson>
            {/*<Tooltip title="Delete">
              <Button
                onClick={() => null}
                className="tw-rounded-full tw-p-2 tw-min-w-fit tw-flex tw-flex-row tw-justify-center tw-mx-auto"
              >
                <IconTrash
                  style={{ color: theme.palette.primary.main }}
                  size="15"
                  strokeWidth={3}
                  className=""
                />
              </Button>
            </Tooltip>*/}
          </>
        );
      },
    },
    /*{
      Header: "Date Added",
      accessor: "created_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },*/
    /*{
      Header: "Date Modified",
      accessor: "modified_date",
      width: 250,
      minWidth: 250,
      Cell: (cell: any) => {
        if (!cell?.value) return "";
        return moment.utc(cell?.value).format("MMMM D, YYYY");
      },
    },*/
  ];
};
