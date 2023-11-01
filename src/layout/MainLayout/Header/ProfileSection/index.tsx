import { useEffect, useRef, useState } from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MainCard from "../../../../ui-component/cards/MainCard";
import Transitions from "../../../../ui-component/extended/Transitions";

// assets
import {
  IconCreditCard,
  IconLogout,
  IconMail,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import useGetUserMe from "src/hooks/settings/useGetUser";
import { useUnreadCount } from "src/hooks/useUnreadCount";
import { useAuth } from "../../../../contexts/auth";
import { devLog } from "../../../../helpers/logs";
import { clear } from "../../../../utils/storage";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const { auth, updateProfile } = useAuth();
  const theme: any = useTheme();
  const customization = useSelector((state: any) => state.customization);
  const { unreadCount } = useUnreadCount();
  console.log({ unreadCount });

  const navigate = useNavigate();

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState("");
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const { loading, data, error } = useGetUserMe();

  console.log("USER", data);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef: any = useRef(null);
  const handleLogout = async () => {
    devLog(() => {
      console.log("Logout");
    });
    await clear();
    window.location.href = "/login";
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event: any, index: any, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const splitEmail = (email: string) => {
    let emailArr = email?.split("@");
    return emailArr?.[0] || "Admin";
  };

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0] || ""}`,
    };
  };

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: "transparent", //borderColor: theme.palette.primary.light,
          backgroundColor: "transparent", //backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              // stroke: theme.palette.primary.light,
              fill: "white",
            },
            "& .name": {
              color: "white",
            },
          },
          "& .MuiChip-label": {
            // lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            {...stringAvatar(
              `${auth?.first_name || splitEmail(auth?.email)} ${
                auth?.last_name || ""
              }`
            )}
            // src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 8px 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <>
            <span className="tw-text-black tw-font-normal tw-text-[16px] tw-tracking-wider tw-space-x-2">
              <span className="name">
                {auth?.first_name || splitEmail(auth?.email)} {auth?.last_name}
              </span>
              <KeyboardArrowDownIcon
                fontSize="small"
                sx={{ position: "relative", top: -1, left: -8 }}
              />
            </span>
            <NotificationsIcon
              className="tw-text-black"
              sx={{
                position: "relative",
                top: -1,
              }}
            />
            {unreadCount !== 0 && (
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
                {unreadCount}
              </span>
            )}
          </>
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  height={450}
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Good day,</Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          {auth?.first_name || splitEmail(auth?.email)}{" "}
                          {auth?.last_name}
                        </Typography>
                      </Stack>
                      <div className="tw-font-thin tw-text-red-600">
                        You have{" "}
                        <span className="tw-font-medium">{unreadCount}</span>{" "}
                        replies.
                      </div>
                      {/*<Typography variant="subtitle2">Project Admin</Typography>*/}
                    </Stack>
                    {/*<OutlinedInput
                      sx={{ width: "100%", pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search profile options"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch
                            stroke={1.5}
                            size="1rem"
                            color={theme.palette.grey[500]}
                          />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />*/}
                    {/*<Divider />*/}
                  </Box>
                  <PerfectScrollbar
                    style={
                      {
                        // height: "100%",
                        // maxHeight: "calc(100vh - 250px)",
                        // height: "200px",
                        // overflowX: "hidden",
                      }
                    }
                  >
                    <Box sx={{ p: 2, pt: 0, pb: 0 }}>
                      {/*<UpgradePlanCard />*/}
                      {/*<Divider />*/}
                      {/*<Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          my: 2,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Start DND Mode
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={sdm}
                                    onChange={(e) => setSdm(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Allow Notifications
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) =>
                                      setNotification(e.target.checked)
                                    }
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>*/}
                      {/*<Divider />*/}
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxHeight: data?.role === "ADMIN" ? 165 : 100,
                          maxWidth: 250, //maxWidth: 350,
                          minWidth: 200, //minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 5}
                          onClick={(event) =>
                            handleListItemClick(event, 5, "/mail-accounts")
                          }
                        >
                          <ListItemIcon>
                            <IconMail stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                Sender Accounts
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 0}
                          onClick={(event) =>
                            handleListItemClick(event, 0, "/settings")
                          }
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">User Info</Typography>
                            }
                          />
                        </ListItemButton>
                        {data?.role == "ADMIN" && (
                          <ListItemButton
                            sx={{
                              borderRadius: `${customization.borderRadius}px`,
                            }}
                            selected={selectedIndex === 1}
                            onClick={(event) =>
                              handleListItemClick(event, 1, "/team")
                            }
                          >
                            <ListItemIcon>
                              <IconUsers stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">Team</Typography>
                              }
                            />
                          </ListItemButton>
                        )}
                        {data?.role === "ADMIN" && (
                          <ListItemButton
                            sx={{
                              borderRadius: `${customization.borderRadius}px`,
                            }}
                            selected={selectedIndex === 2}
                            onClick={(event) =>
                              handleListItemClick(event, 2, "/billing")
                            }
                          >
                            <ListItemIcon>
                              <IconCreditCard stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">Billing</Typography>
                              }
                            />
                          </ListItemButton>
                        )}
                        {/* <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(
                              event,
                              1,
                              "/user/social-profile/posts"
                            )
                          }
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">
                                    Social Profile
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton> */}
                        {/* <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 3}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton> */}
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
