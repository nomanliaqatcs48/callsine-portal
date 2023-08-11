import React from "react";
import PricingBox from "./Pricing";
import Footer from "../home/Footer";
import { Helmet } from "react-helmet-async";

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Plans & Pricing | CallSine</title>
      </Helmet>
      <PricingBox />
      <Footer />
    </>
  );
};

export default PricingPage;
