import React from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
        <Outlet />
      </Box>
      {/*<Footer />*/}
    </>
  );
};

export default PublicLayout;
