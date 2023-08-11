import { Box, Typography } from "@mui/material";
import "./index.css";
import Footer from "../home/Footer";
import React from "react";
import Privacy from "./Privacy";
import { Helmet } from "react-helmet-async";
import FooterBlueBar from "../home/FooterBlueBar";

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | CallSine</title>
      </Helmet>
      <Privacy />
      <Footer />
      <FooterBlueBar />
    </>
  );
};

export default PrivacyPage;
