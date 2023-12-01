import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconCircleCheck, IconCircleX, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
// import { IconTrash, IconCircleX, IconCircleCheck } from "@tabler/icons-react";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment-timezone";
import { ReactComponent as FacebookIcon } from "../../assets/images/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/images/svg/linkedin.svg";
import { ReactComponent as UserIcon } from "../../assets/images/svg/user.svg";
import DeletePerson from "../../ui-component/buttons/DeletePerson";

import { SelectChangeEvent } from "@mui/material/Select";
import { useUnreadCount } from "src/hooks/useUnreadCount";
import http from "src/services/axios";
import { endpoints } from "src/services/endpoints";
import { personUpdateAssign } from "src/services/persons.service";
import StatusDropdown from "src/views/persons/Detail/components/StatusDropdown";
import { useAuth } from "../../contexts/auth";
import { ToastSuccess } from "../../helpers/toast";
import { usePersons } from "../../hooks/persons/usePersons";

type Member = {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  id?: number;
};

export const _columns: any = () => {
  const { auth } = useAuth();
  const theme: any = useTheme();
  const [timezone, setTimezone] = useState<any>(moment.tz.guess());
  const [members, setMembers] = useState<Member[]>([]);
  const [isMembersDataLoaded, setIsMembersDataLoaded] = useState(false);

  const { unreadEmails } = useUnreadCount();

  const { updateForceEnable } = usePersons();

  const countUnreadEmails = (email: string) => {
    const filteredCount = unreadEmails.filter(
      (unReadEmail: any) => unReadEmail.to === email
    ).length;
    return filteredCount;
  };

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

  const handleChangeSelect = (
    event: SelectChangeEvent<unknown>,
    cellRowId: number
  ) => {
    const selectedValue = event.target.value as number;
    personUpdateAssign(cellRowId, selectedValue)
      .then((response) => {
        if (response.data) {
          ToastSuccess("Successfully assigned.");
        }
      })
      .catch((error) => {
        console.error("Error updating assignment:", error);
      });
  };

  // useEffect(() => {
  //   http
  //     .get(`${endpoints.TEAM_MEMBERS_ASSIGN}${auth.team}/`)
  //     .then((response) => {
  //       setMembers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching team members:", error);
  //     });
  // }, []);

  useEffect(() => {
    http
      .get(`${endpoints.TEAM_MEMBERS_ASSIGN}${auth.team}/`)
      .then((response) => {
        setMembers(response.data);
        setIsMembersDataLoaded(true); // Set a flag to indicate data is loaded
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
        setIsMembersDataLoaded(true); // Ensure the flag is set even in case of an error
      });
  }, []);

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
                  {`${cell?.row?.original?.person_city || ""}${
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
                      <div
                        className="tw-flex tw-justify-center tw-items-center tw-gap-x-5 "
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <div className="tw-relative tw-w-8 tw-h-8 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                          <UserIcon className="tw-absolute tw-w-8 tw-h-8 tw-text-gray-400" />
                        </div>
                        <div>
                          <span className="tw-font-bold tw-text-[0.80rem]">
                            {cell?.value || ""}
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
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "clip",
                          textOverflow: "ellipsis",
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
                    className="tw-relative tw-flex tw-items-center tw-justify-start tw-gap-2 tw-text-inherit tw-text-[0.75rem] tw-leading-4 tw-no-underline hover:tw-bg-transparent tw-font-normal"
                    href={`/people/${cell?.row?.original?.id}`}
                  >
                    <div className="tw-flex tw-items-center tw-justify-center tw-min-w-[40px] tw-w-9 tw-h-9 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                      <UserIcon className="tw-absolute tw-min-w-9 tw-w-7 tw-h-7 tw-text-gray-400" />
                    </div>
                    <span>
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {cell?.value || ""}{" "}
                        {cell?.row?.original?.last_name || ""}
                      </span>

                      {countUnreadEmails(cell?.row?.original?.work_email) !==
                        0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "12px",
                          }}
                        >
                          {countUnreadEmails(cell?.row?.original?.work_email)}
                        </span>
                      )}
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
        Header: "Company Website",
        accessor: "company_website",
        sorting_id: "company_website",
      },
      {
        Header: "Industry",
        accessor: "industry",
        sorting_id: "industry",
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
        accessor: "total_email_sent",
        width: 90,
        minWidth: 90,
      },
      {
        Header: "Opened",
        accessor: "total_opened",
        width: 90,
        minWidth: 90,
      },
      {
        Header: "Clicks",
        accessor: "total_click_count",
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
            <>
              <Tooltip title={cell?.value}>
                <Box>{moment(cell?.value).tz(timezone).format("lll")}</Box>
              </Tooltip>
            </>
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
            <>
              <Tooltip title={cell?.value}>
                <Box>{moment(cell?.value).tz(timezone).format("lll")}</Box>
              </Tooltip>
            </>
          ) : (
            <hr className="tw-w-3 tw-border-black" />
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        width: 80,
        minWidth: 80,
        Cell: (cell: any) => {
          return (
            <StatusDropdown
              status={cell?.cell?.value}
              id={cell.cell.row.original.id}
            />
          );
        },
      },
      // {
      //   Header: "Tags",
      //   accessor: "tags",
      //   disableSortBy: true,
      //   width: 80,
      //   minWidth: 80,
      //   Cell: (cell: any) => {
      //     let res = "";
      //     if (cell?.value?.length > 0) {
      //       res = cell?.value.map((item: any) => item.name).join(", ");
      //     }
      //     return res;
      //   },
      // },
      {
        Header: "Assign",
        // disableSortBy: true,
        sorting_id: "assigned_user",
        accessor: "assign",
        width: 130,
        minWidth: 130,
        Cell: (cell: any) => {
          const [localSelectedValue, setLocalSelectedValue] = useState<
            string | null
          >(null);

          useEffect(() => {
            setLocalSelectedValue(cell.row.original.assigned_user);
          }, [cell.row.original.assigned_user, auth?.id]);

          return (
            <>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={localSelectedValue}
                label="Assign"
                fullWidth
                onChange={(e) => {
                  setLocalSelectedValue(e.target.value);
                  handleChangeSelect(e, cell.row.original.id);
                }}
              >
                {members.length !== 0
                  ? members.map((member: Member, index: number) => {
                      return (
                        <MenuItem value={member.id} key={index}>
                          {member.email}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </>
          );
        },
      },
      {
        Header: "Data Available",
        // disableSortBy: false,
        accessor: "data_availability",
        sorting_id: "got_data",
        width: 50,
        minWidth: 50,
        Cell: (cell: any) => {
          // console.log(cell.row.original.force_enable)

          const handleUpdate = async (person_id: number) => {
            updateForceEnable(person_id);
            ToastSuccess("Person successfully enabled.");
          };
          return (
                <div style={{ display: "flex", alignItems: "center" }}>
                   {cell.row.original.force_enable ? (
                  <IconCircleCheck
                  style={{ color: theme.palette.success.main }}
                  size="20"
                  strokeWidth={3}
                  className=""
                />
                ):(
                  <IconCircleX
                    style={{ color: theme.palette.error.main }}
                    size="20"
                    strokeWidth={3}
                    className=""
                  />
                )}
                  <Button
                    variant="text"
                    className="tw-mx-2"
                    onClick={(e) => handleUpdate(cell.row.original.id)}
                    disabled={cell.row.original.force_enable}
                  >
                    {cell.row.original.force_enable ? "Enabled" : "Enable"}
                  </Button>
                </div>
          );
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
    [isMembersDataLoaded]
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
    fontSize: "16px",
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
    fontSize: "16px",
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
    "tw-w-4/12 tw-font-normal tw-text-[16px] tw-text-callsineGray lg:tw-w-3/12 xl:tw-w-2/12 2xl:tw-w-1/12 tw-flex tw-items-center",
  labelValue:
    "tw-w-8/12 tw-font-normal tw-text-[#889bb3] tw-truncate lg:tw-w-9/12 xl:tw-w-10/12 2xl:tw-w-11/12 2xl:tw-pl-4",
  labelValueInput:
    "tw-w-full tw-outline-none tw-border-b tw-text-[16px] tw-text-callsineGray tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]",
};
