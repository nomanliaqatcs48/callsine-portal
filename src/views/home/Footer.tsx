import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { IconBrandFacebookFilled, IconSend } from "@tabler/icons-react";
import icon from "../../assets/images/icons/logo-color-2x.png";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: "#2C2C2C",
  padding: "46px 24px",
  color: "#FFFFFF",
  /*[theme.breakpoints.up("md")]: {
    padding: "46px 182px",
  },*/
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
  padding: "26px 182px",
  [theme.breakpoints.down("sm")]: {
    padding: "46px 12px",
    justifyContent: "center",
    flexWrap: "wrap",
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
  return (
    <div>
      <FooterContainer>
        <Box
          className="tw-gap-[50px] xl:tw-gap-[40px] xl:tw-my-[46px] xl:tw-mx-[140px] 4xl:tw-flex-nowrap 4xl:tw-gap-[230px]"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // gap: "24px",
            // gap: 0,
            flexWrap: "wrap",
          }}
        >
          <Box
            className="md:tw-w-full lg:tw-w-3/12"
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
            sx={{ marginBottom: 0 }}
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
            className="tw-pt-3 md:tw-w-6/12 lg:tw-w-4/12"
            sx={{ marginBottom: 0 }}
          >
            <TextContainer>
              <Typography
                className="tw-font-semibold tw-text-[23px]"
                variant="h3"
                sx={{ color: "#fff", marginBottom: "15px" }}
              >
                Subscribe Now
              </Typography>
              <Typography
                className="tw-font-normal tw-text-[18px] tw-mb-4"
                variant="h5"
                sx={{ color: "#B5B5B5", marginBottom: "5px" }}
              >
                Sign up if you want to get notifications
              </Typography>
            </TextContainer>
            <SubscribeContainer>
              <MailInput type="email" placeholder="Enter your email" />
              <ButtonSend>
                <IconSend color="#fff" />
              </ButtonSend>
            </SubscribeContainer>
          </Box>
        </Box>
      </FooterContainer>
      <BottomBar className="tw-d-flex">
        <Typography variant="subtitle2" align="right" sx={{ color: "#fff" }}>
          © 2023 CallSine. All Rights Reserved.
          {/*© 2023 Company Name. All rights reserved.*/}
        </Typography>
        <Typography variant="subtitle2" align="left" sx={{ color: "#fff" }}>
          <Button
            variant="text"
            href="https://www.unionresolute.com/privacy-policy/"
            rel="noreferrer noopener"
            className="tw-text-white tw-text-[12px] tw-p-0"
          >
            Privacy
          </Button>{" "}
          | Terms & Conditions
        </Typography>
      </BottomBar>
    </div>
  );
};

export default Footer;
