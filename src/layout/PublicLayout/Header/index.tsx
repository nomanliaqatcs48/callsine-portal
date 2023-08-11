import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../../assets/images/icons/logo-2x.png";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useAuthentication } from "../../../hooks/useAuthentication";
import ButtonV1 from "../../../ui-component/buttons/ButtonV1";

interface HeaderProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  // { name: "Home", url: "home" },
  // { name: "About Us", url: "about-us" },
  // { name: "Services", url: "services" },
  // { name: "Contact", url: "contact" },
  { name: "Pricing", url: "pricing" },
  { name: "Blog", url: "/#" },
];

const Header = (props: any) => {
  const theme: any = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthentication();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      {/*<Typography
        className="tw-text-[40px]"
        variant="h6"
        sx={{ my: 2, fontFamily: "Poppins" }}
      >
        CALLSINE
      </Typography>*/}
      <Typography variant="h6" component={Link} to={"/home"}>
        <img
          className="tw-w-full tw-py-[15px] tw-px-[15px]"
          src={icon}
          alt="CALLSINE ICON"
          width={150}
          height={50}
          style={{ marginRight: matchDownSM ? 8 : 16 }}
        />
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton className="hover:tw-bg-transparent">
            {/*<Typography
              component={Link}
              to={"/login"}
              variant="subtitle1"
              sx={{ textDecoration: "none", textAlign: "center" }}
            >
              LOGIN
            </Typography>*/}

            <Typography
              className="tw-bg-[#1976d2] tw-font-semibold hover:tw-text-white hover:tw-no-underline lg:tw-py-[15px] lg:tw-px-[57px] tw-mx-auto"
              component={Link}
              to={"/login"}
              variant="subtitle1"
              sx={{
                fontSize: 16,
                margin: "0px 5px",
                textDecoration: "none",
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
                //
                border: "1px solid #fff",
                padding: "12px 24px",
                borderRadius: "8px",
              }}
            >
              LOGIN
            </Typography>
          </ListItemButton>
        </ListItem>
        {navItems.map((item: any) => (
          <ListItem key={item} disablePadding>
            <ListItemButton className="tw-group">
              <Typography
                className="tw-text-white group-hover:tw-text-black hover:tw-no-underline"
                component={Link}
                to={"/" + item.url}
                variant="subtitle1"
                sx={{ textDecoration: "none", textAlign: "center" }}
              >
                {item.name.toUpperCase()}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  const useStyles = makeStyles((theme: any) => ({
    appBar: {
      [theme.breakpoints.up("md")]: {
        backgroundColor: "transparent",
      },
      minHeight: "66px",
      padding: "10px 0px",
    },
    scrolledAppBar: {
      backgroundColor: "#1976D2",
      color: "#000",
      minHeight: "66px",
      padding: "0px 0px",
      boxShadow: "0px 1px 1px 1px #22222245",
    },
    loginBtn: {
      border: "1px solid #fff",
      padding: "12px 24px",
      borderRadius: "8px",
    },
  }));
  const classes = useStyles();

  return (
    <Grid container>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          className={`${classes.appBar} ${
            props.scrolled ? classes.scrolledAppBar : ""
          }`}
          component="nav"
          elevation={0}
        >
          <Toolbar
            className="2xl:tw-px-[240px]"
            sx={{ minHeight: "0px !important", px: { lg: 12 } }}
          >
            {/* sx={{ px: { lg: 15, xl: 30 } }} */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to={"/home"}
              sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
            >
              <img
                src={icon}
                alt="CALLSINE ICON"
                width={150}
                height={50}
                style={{ marginRight: matchDownSM ? 8 : 16 }}
              />
            </Typography>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {navItems.map((item) => (
                <Typography
                  key={item.name}
                  component={Link}
                  to={"/" + item.url}
                  variant="subtitle1"
                  sx={{
                    fontSize: 16,
                    margin: "0px 20px",
                    textDecoration: "none!important",
                    color: "#fff",
                  }}
                  className="tw-font-comfortaa tw-text-white tw-font-normal tw-no-underline hover:tw-text-[#c3c3c3] hover:tw-no-underline focus:tw-text-white lg:tw-text-[18px] tw-leading-[20px]"
                >
                  {item.name.toUpperCase()}
                </Typography>
              ))}

              <ButtonV1
                variant="transparent"
                addClassname="tw-font-comfortaa"
                style={{
                  fontSize: 18,
                  padding: "4px 26px",
                  marginLeft: 10,
                  borderRadius: 8,
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOGIN
              </ButtonV1>
              {/*<Typography
                className="tw-font-semibold tw-font-comfortaa tw-tracking-[0.32px] tw-transition-all tw-border tw-border-transparent tw-bg-white tw-text-[#1976D2] hover:tw-text-[#1976D2] hover:tw-bg-[#f2f2f2] hover:tw-no-underline lg:tw-text-[18px] lg:tw-py-[15px] lg:tw-px-[42px]"
                component={Link}
                to={"/login"}
                variant="subtitle1"
                sx={{
                  fontSize: 16,
                  margin: "0px 5px",
                  textDecoration: "none",
                  color: "#fff",
                  //
                  // border: "1px solid #fff",
                  padding: "12px 24px",
                  borderRadius: "5px",
                }}
              >
                LOGIN
              </Typography>*/}
            </Box>
          </Toolbar>
        </AppBar>

        {/*mobile*/}
        <Box component="nav">
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                backgroundColor: "#1976d2",
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </Grid>
  );
};

export default Header;
