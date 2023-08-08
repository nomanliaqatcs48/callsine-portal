import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { IconBrandFacebookFilled, IconSend } from "@tabler/icons-react";
import icon from "../../assets/images/icons/logo-color-2x.png";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: "#2C2C2C",
  padding: "46px 24px",
  color: "#FFFFFF",
  [theme.breakpoints.up("lg")]: {
    padding: "46px 96px",
  },
}));

const FooterContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  flexWrap: "wrap",
});

const LeftContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const LogoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
});

const Logo = styled("img")({
  width: "180px",
  height: "45px",
  marginRight: "8px",
});

const SmallText = styled("p")({
  fontSize: "16px",
  marginBottom: "4px",
  lineHeight: "26px",
});

const SocialIconsContainer = styled("div")({
  display: "flex",
  gap: "10px",
  marginTop: "15px",
});

const ContactInfo = styled("div")({
  marginBottom: "24px",
});

const SubscribeContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const BottomBar = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#1976D2",
  // padding: "26px 182px",
  [theme.breakpoints.down("sm")]: {
    // padding: "46px 12px",
    // justifyContent: "center",
    // flexWrap: "wrap",
  },
}));

const ButtonSend = styled("button")({
  backgroundColor: "#1976D2 !important",
  textAlign: "center",
  width: "52px",
  height: "49px",
  paddingLeft: "10px",
  border: "none",
  borderRadius: "0px 15px 15px 0px",
});

const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginRight: "8px",
});

const MailInput = styled("input")({
  padding: "15px",
  outline: "none",
  color: "black",
  borderRadius: "15px 0px 0px 15px",
  width: "100%",
});

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <div>
      <FooterContainer className="2xl:tw-px-[240px]">
        <Box
          className="tw-gap-[50px] xl:tw-gap-[40px] xl:tw-my-[46px] 4xl:tw-flex-nowrap 4xl:tw-gap-[230px]"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // gap: "24px",
            // gap: 0,
            flexWrap: "wrap",
          }}
        >
          <Box
            className="md:tw-w-full lg:tw-w-5/12"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <LogoContainer>
              <Logo src={icon} alt="Logo" />
            </LogoContainer>
            <SmallText sx={{ color: "#B5B5B5" }}>
              CallSine's AI uses a large language model (LLM) and leverages an
              algorithm that goes deep in massively large data sets to
              understand, summarize, generate, and predict new email content.
            </SmallText>
            {/*<SocialIconsContainer>
              <IconBrandFacebookFilled />
              <IconBrandFacebookFilled />
              <IconBrandFacebookFilled />
            </SocialIconsContainer>*/}
          </Box>
          <Box
            className="tw-pt-3 md:tw-w-5/12 lg:tw-w-3/12"
            sx={{ marginBottom: 0, display: "none" }}
          >
            <Typography
              className="tw-font-semibold tw-text-[23px]"
              variant="h3"
              sx={{ color: "#fff", marginBottom: "15px" }}
            >
              Contact Us
            </Typography>
            <Typography
              className="tw-font-normal tw-text-[18px] tw-mb-1"
              variant="subtitle1"
              sx={{ color: "#B5B5B5" }}
            >
              info@callsine.com
              {/*callsine@gmail.com*/}
            </Typography>
            <Typography
              className="tw-font-normal tw-text-[18px] tw-mb-1 tw-leading-[27px]"
              variant="subtitle1"
              sx={{ color: "#B5B5B5" }}
            >
              132, My Street, Kingston, New York 12401
            </Typography>
            <Typography
              className="tw-font-normal tw-text-[18px]"
              variant="subtitle1"
              sx={{ color: "#B5B5B5" }}
            >
              (555) 555-1234
            </Typography>
          </Box>
          <Box
            className="tw-pt-3 tw-w-full lg:tw-w-4/12 lg:tw-flex lg:tw-flex-col lg:tw-justify-center lg:tw-items-end"
            sx={{ marginBottom: 0 }}
          >
            <TextContainer>
              <Button
                className="tw-rounded-[5px] tw-text-center lg:tw-text-[25px] lg:tw-w-[262px]"
                sx={{
                  backgroundColor: "transparent !important",
                  color: "#fff",
                  padding: "12px 24px",
                  [theme.breakpoints.up("xl")]: {
                    padding: "15px 47px",
                  },
                  marginLeft: 3,
                  border: "1px solid #fff",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer",
                  [theme.breakpoints.down("md")]: {
                    marginY: 1,
                    marginLeft: 0,
                  },
                }}
                size="large"
                onClick={() => {
                  window.open(
                    "https://calendly.com/unionresolute/union-s-callsine-demo"
                  );
                }}
              >
                Book a Demo
                {/*Request for a demo*/}
              </Button>
              {/*<Typography
                className="tw-font-semibold tw-text-[23px]"
                variant="h3"
                sx={{ color: "#fff", marginBottom: "15px" }}
              >
                Book A Demo
              </Typography>*/}
              {/*<Typography
                className="tw-font-normal tw-text-[18px] tw-mb-4"
                variant="h5"
                sx={{ color: "#B5B5B5", marginBottom: "5px" }}
              >
                Sign up if you want to get notifications
              </Typography>*/}
            </TextContainer>
            {/*<SubscribeContainer>
              <MailInput type="email" placeholder="Enter your email" />
              <ButtonSend>
                <IconSend color="#fff" />
              </ButtonSend>
            </SubscribeContainer>*/}
          </Box>
        </Box>
      </FooterContainer>
      <BottomBar className="tw-flex tw-flex-col tw-justify-center tw-py-[29px] tw-px-[20px] tw-items-center sm:tw-flex-row sm:tw-justify-between lg:tw-px-[96px] 2xl:tw-px-[240px]">
        <Typography
          className="tw-font-light tw-text-[13px]"
          variant="subtitle2"
          align="right"
          sx={{ color: "#F2F4F8" }}
        >
          © 2023 CallSine LLC. All Rights Reserved.
          {/*© 2023 Company Name. All rights reserved.*/}
        </Typography>
        <Typography
          className="tw-flex tw-gap-7 tw-font-light tw-text-[13px]"
          variant="subtitle2"
          align="left"
          sx={{ color: "#F2F4F8" }}
        >
          <Button
            variant="text"
            href="https://www.unionresolute.com/privacy-policy/"
            rel="noreferrer noopener"
            className="tw-text-[#F2F4F8] tw-font-light tw-text-[13px] tw-p-0"
            target="_blank"
            sx={{
              color: "#F2F4F8!important",
              textDecoration: "none!important",
            }}
          >
            Privacy
          </Button>{" "}
          <Button
            variant="text"
            href="#"
            rel="noreferrer noopener"
            className="tw-text-[#F2F4F8] tw-font-light tw-text-[13px] tw-p-0"
            // target="_blank"
            sx={{
              color: "#F2F4F8!important",
              textDecoration: "none!important",
            }}
          >
            Terms & Conditions
          </Button>
        </Typography>
      </BottomBar>
    </div>
  );
};

export default Footer;
