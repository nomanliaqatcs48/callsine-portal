import PropTypes, { InferProps } from "prop-types";

// material-ui
import {
  Box,
  Drawer,
  Grid,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// third-party
import { BrowserView, MobileView } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import { MendableSearchBar } from "@mendable/search";
import { IconBook2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useTour } from "src/providers/tourprovider";
import { drawerWidth } from "../../../store/constant";
import LogoSectionSidebar from "../LogoSectionSidebar";
import MenuList from "./MenuList";

// ==============================|| SIDEBAR DRAWER ||============================== //

const SidebarPropTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.any,
};

type SidebarTypes = InferProps<typeof SidebarPropTypes>;

const Sidebar = ({ drawerOpen, drawerToggle, window }: SidebarTypes) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const { isTourActive, stopTour, startTour } = useTour();

  const toggleTourOn = () => {
    if (isTourActive) {
      stopTour();
    } else {
      startTour();
    }
  };

  useEffect(() => {
    // This will log the global window object after the component mounts
    console.log("WINDOW GLOBAL", globalThis.window); // or simply console.log(window.self);
    // Now you can safely call _gs or any other window method
  }, []);

  const drawer = (
    <>
      <Box
        className="tw-bg-primary"
        // sx={{ display: { xs: "block", md: "none" } }}
        sx={{ display: "block" }}
      >
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          {/*<LogoSection />*/}
          <LogoSectionSidebar />
        </Box>
      </Box>
      <BrowserView className="tw-bg-primary">
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 74px)",
            // height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            // paddingLeft: "16px",
            // paddingRight: "16px",
          }}
        >
          <MenuList />
          {/*<MenuCard />*/}
          <Grid
            pb={10}
            className="tw-bg-primaryLight"
            sx={{
              width: matchUpMd ? drawerWidth : "auto",
              position: "fixed",
              bottom: 0,
              pl: 5,
              pr: 3,
              pb: 2,
            }}
          >
            <Box
              sx={{
                marginTop: 1,
                flexDirection: "column",
                display: "flex",
                alignItems: "left",
                justifyContent: "space-between",
                marginLeft: -3
              }}
            >
              <Typography variant="h3" color="white" mb={1}>
                <b>Need Help?</b>
              </Typography>
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"bold"} color="white">
                {" "}
                Turn on Guide
              </Typography>
              <Switch
                checked={isTourActive}
                onChange={toggleTourOn}
                sx={{
                  ".MuiSwitch-switchBase": {
                    color: theme.palette.grey[50], // Off state color
                    "&.Mui-checked": {
                      color: theme.palette.grey[100], // On state color
                    },
                    "&.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: theme.palette.grey[100], // On state track color
                    },
                  },
                  ".MuiSwitch-track": {
                    backgroundColor: theme.palette.grey[50], // Off state track color
                  },
                }}
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection="row"
              pr={2}
              mb={1}
              alignItems={"center"}
            >
              
              <a href="/wizard/tutorial" style={{ textDecoration: "none", marginRight: "1.7rem" }}>
                <Typography color="white" fontWeight={"bold"}>
                  Click for Tutorial
                </Typography>
              </a>
              <IconBook2 color="white" />
            </Box>
            <MendableSearchBar
              placeholder="Help"
              style={{ darkMode: false, accentColor: "#123456" }}
              anon_key={"8fb50d66-58ba-40f6-86fb-ab2caeb2911e"}
            />

            {/* <a>
              <Box
                mb={2}
                onClick={() => globalThis.window._gs("chat", "show")}
                display={"flex"}
                flexDirection="row"
                alignItems={"center"}
              >
                <IconMessageChatbot color="white" />
                <Typography color="white" fontWeight="bold">
                  {" "}
                  Click to Chat With Us{" "}
                </Typography>
              </Box>
            </a> */}
          </Grid>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView className="tw-bg-primary">
        <Box
          sx={{
            px: 2,
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 74px)",
          }}
        >
          <MenuList />
          {/*<MenuCard />*/}
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        // @ts-ignore
        open={drawerOpen}
        // @ts-ignore
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              // top: "88px",
              top: "0px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
