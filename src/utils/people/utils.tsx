import React, { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Tooltip,
} from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import { ReactComponent as UserIcon } from "../../assets/images/svg/user.svg";
import { ReactComponent as FacebookIcon } from "../../assets/images/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/images/svg/linkedin.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import DeletePerson from "../../ui-component/buttons/DeletePerson";
import moment from "moment/moment";

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

  return useMemo(
    () => [
      {
        Header: "Name",
        accessor: "first_name",
        tdClassName: "tw-px-0",
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
            <span className="">
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
                              : "No linkedin yet"
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
                              : "No facebook yet"
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
                              <ListItemCustom
                                icon={item.icon}
                                text={item.text}
                              />
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
                    className="tw-flex tw-items-center tw-justify-start tw-gap-2 tw-text-inherit tw-text-[0.75rem] tw-leading-4 tw-no-underline hover:tw-bg-transparent text"
                    href={`/people/${cell?.row?.original?.id}`}
                  >
                    <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                      <UserIcon className="tw-absolute tw-w-7 tw-h-7 tw-text-gray-400" />
                    </div>
                    <span>
                      {cell?.value || ""} {cell?.row?.original?.last_name || ""}
                    </span>
                  </Button>
                </Tooltip>
              )}
            </span>
          );
        },
      },
      {
        Header: "Title",
        accessor: "job_title",
      },
      {
        Header: "Company",
        accessor: "company_name",
        sorting_id: "org__name",
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
        Header: "Sent Emails",
        accessor: "sent_emails",
        width: 90,
        minWidth: 90,
      },
      {
        Header: "Last Contacted",
        accessor: "last_contacted",
        width: 90,
        minWidth: 90,
        Cell: (cell: any) => {
          return cell?.value ? (
            moment(cell.value).format("YYYY/MM/DD")
          ) : (
            <hr className="tw-w-3 tw-border-black" />
          );
        },
      },
      {
        Header: "Next Scheduled",
        accessor: "next_scheduled_email",
        width: 90,
        minWidth: 90,
        Cell: (cell: any) => {
          return cell?.value ? (
            moment(cell.value).format("YYYY/MM/DD")
          ) : (
            <hr className="tw-w-3 tw-border-black" />
          );
        },
      },
      {
        Header: "Tags",
        accessor: "tags",
        disableSortBy: true,
        width: 80,
        minWidth: 80,
        Cell: (cell: any) => {
          let res = "";
          if (cell?.value?.length > 0) {
            res = cell?.value.map((item: any) => item.name).join(", ");
          }
          return res;
        },
      },
      {
        Header: "Actions",
        disableSortBy: true,
        accessor: "actions",
        width: 50,
        minWidth: 50,
        Cell: (cell: any) => {
          return (
            <>
              <DeletePerson id={cell?.row?.original?.id}>
                <IconTrash
                  style={{ color: theme.palette.primary.main }}
                  size="16"
                  strokeWidth={3}
                  className=""
                />
              </DeletePerson>
            </>
          );
        },
      },
    ],
    []
  );
};

export const selectBlueStyles = {
  control: (styles: any) => ({
    ...styles,
    display: "flex",
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid transparent", //"1px solid #1a76d2",
    cursor: "pointer",
    justifyContent: "start",
    alignItems: "start",
    minHeight: 0,
    borderRadius: 0,
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "500ms",
    "&:hover": {
      borderColor: "transparent",
    },
    "&.select__control--menu-is-open": {
      borderBottom: "1px solid #1a76d2",
    },
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#1a76d2"
        : isFocused
        ? "white"
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? "white"
        : isFocused
        ? "#0253ad"
        : "#3486d7",
      cursor: isDisabled ? "not-allowed" : "pointer",
      padding: "8px 18px",
      fontWeight: 400,
      fontSize: "0.83rem",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? data.color : undefined,
      },
    };
  },
  menu: (styles: any, { isLoading, placement, children }: any) => ({
    ...styles,
    border: "1px solid #74ace4",
    boxShadow: "none",
    borderRadius: 7,
    background: "#f8fbff",
    zIndex: 9,
    position: "relative",
  }),
  menuList: (styles: any) => ({
    ...styles,
    paddingTop: 10,
    paddingBottom: 10,
  }),
  input: (styles: any) => ({ ...styles, color: "#889bb3" }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#889bb3",
    fontSize: "0.875rem",
    fontWeight: 400,
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: 0,
    display: "flex",
  }),
  singleValue: (styles: any, { data }: any) => ({
    ...styles,
    color: "#889bb3",
  }),
  clearIndicator: (styles: any) => ({ ...styles, padding: 0 }),
  indicatorSeparator: (
    styles: any,
    { isDisabled, isFocused, innerProps }: any
  ) => ({ ...styles, display: "none" }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    display: "none",
    color: "#889bb3",
    ":hover": {
      color: "#889bb3",
    },
    svg: {
      width: 16,
    },
  }),
};

export const _styles = {
  containers:
    "tw-px-2 tw-py-2 tw-border-b tw-border-[#f2f3f9] xl:tw-px-10 xl:tw-py-3",
  label:
    "tw-w-4/12 tw-font-light tw-text-[#889bb3] lg:tw-w-3/12 xl:tw-w-2/12 2xl:tw-w-1/12 tw-flex tw-items-center",
  labelValue:
    "tw-w-8/12 tw-font-normal tw-text-[#889bb3] tw-truncate lg:tw-w-9/12 xl:tw-w-10/12 2xl:tw-w-11/12 2xl:tw-pl-4",
  labelValueInput:
    "tw-w-full tw-outline-none tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]",
};
