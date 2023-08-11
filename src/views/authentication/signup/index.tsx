import React from "react";
import Register from "./Register";
import imageBgc from "../../../assets/images/users/Group3.png";
import imageBgcTop from "../../../assets/images/users/Rectangle1.png";
import { Box } from "@mui/material";
import Footer from "../../home/Footer";
import FooterBlueBar from "../../home/FooterBlueBar";
import { Helmet } from "react-helmet-async";

const index = () => {
  return (
    <>
      <Helmet>
        <title>Signup | CallSine</title>
      </Helmet>
      <Box className="signup-page">
        <Box className="">
          <Box className="tw-flex tw-flex-col lg:tw-flex-row">
            <Box
              className="tw-hidden tw-relative lg:tw-flex lg:tw-items-center lg:tw-w-2/3"
              style={{ position: "relative", height: "100vh" }}
            >
              <img
                className="h-auto max-w-full"
                src={imageBgc}
                alt="description"
                style={{
                  position: "absolute",
                  zIndex: "999",
                  height: "100vh",
                  width: "100%",
                  mixBlendMode: "overlay",
                }}
              />
              <img
                className="h-auto max-w-full"
                src={imageBgcTop}
                alt="description"
                style={{ position: "absolute", height: "100vh", width: "100%" }}
              />
              <Box
                className="tw-px-9 tw-space-y-5 tw-text-white 2xl:tw-px-20 3xl:tw-px-40 4xl:tw-px-52"
                style={{ position: "relative", zIndex: "999999" }}
              >
                <Box className="tw-font-normal tw-text-[80px] tw-leading-[100px]">
                  Unleash the power of AI for sales
                </Box>
                <p className="tw-font-normal tw-text-[30px] tw-leading-[46px]">
                  CallSine™ is for salespeople and teams looking for an at scale
                  email outreach platform sending individualized emails to each
                  prospect.
                </p>
              </Box>
            </Box>
            <Box className="lg:tw-w-1/2">
              <Register />
            </Box>
          </Box>
        </Box>

        <FooterBlueBar />
      </Box>
    </>
  );
};

export default index;
