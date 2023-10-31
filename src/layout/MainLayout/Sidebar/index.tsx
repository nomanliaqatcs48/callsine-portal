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
            className="tw-bg-primaryLight"
            sx={{
              width: matchUpMd ? drawerWidth : "auto",
              position: "fixed",
              bottom: 0,
              pl: 5,
              pr: 3,
              pb: 1,
            }}
          >
            <Box
              sx={{
                marginTop: 2,
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography color="white" fontWeight="bold">
                Need Help?
              </Typography>
              <a href="/wizard/tutorial" style={{ textDecoration: "none" }}>
                <Typography color="white">
                  <u>Quick Tutorial </u>
                </Typography>
              </a>
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
