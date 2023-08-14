import React from "react";
import { Box, Typography } from "@mui/material";
import Terms from "./Terms";
import { Helmet } from "react-helmet-async";
import Footer from "../home/Footer";
import FooterBlueBar from "../home/FooterBlueBar";
import "./index.css";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | CallSine</title>
      </Helmet>
      <Terms />
      <Footer />
      <FooterBlueBar />
    </>
  );
};

export default TermsAndConditions;
