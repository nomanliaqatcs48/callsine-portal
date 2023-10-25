import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// material-ui
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import Breadcrumbs from "../../ui-component/extended/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Customization from "../Customization";
import navigation from "../../menu-items";
import { SET_MENU } from "../../store/actions";
import { drawerWidth } from "../../store/constant";

// assets
import { IconChevronRight } from "@tabler/icons-react";
import { useTour } from "src/providers/tourprovider";

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: any) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
    // Overrides
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme: any = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  // Handle left drawer
  const leftDrawerOpened = useSelector(
    (state: any) => state.customization.opened
  );
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const { isTourActive } = useTour();

  const appBarStyleOpen = !leftDrawerOpened
    ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("md")]: {
          marginLeft: -(drawerWidth - 20),
          width: `calc(99%)`,
        },
        [theme.breakpoints.down("md")]: {
          marginLeft: "20px",
          // width: `calc(100% - ${drawerWidth}px)`,
          width: "100%",
          padding: "16px",
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "10px",
          // width: `calc(100% - ${drawerWidth}px)`,
          width: "100%",
          padding: "16px",
          marginRight: "10px",
        },
      }
    : {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down("lg")]: {
          // width: `calc(100% - ${drawerWidth}px)`,
        },
        [theme.breakpoints.down("md")]: {
          marginLeft: "20px",
          width: `100%`,
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "10px",
          width: "100%",
        },
      };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          /*transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",*/
          ...appBarStyleOpen,
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar
        drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/* main content */}
      {/*@ts-ignore*/}
      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs
          // @ts-ignore
          separator={IconChevronRight}
          navigation={navigation}
          icon
          title
          rightAlign
        />
        {isTourActive && (
          <Grid className="tw-rounded-lg tw-px-5 tw-bg-[#F28500] tw-mx-5 tw-mb-4 tw-py-4">
            <Box flexDirection={"row"}>
              <Typography color="white" fontWeight={"bold"}>
                Welcome! Scroll over areas with the orange border for a quick
                explanation of what to do!
              </Typography>
            </Box>
          </Grid>
        )}
        <Outlet />
      </Main>
      {/*<Customization />*/}
    </Box>
  );
};

export default MainLayout;
