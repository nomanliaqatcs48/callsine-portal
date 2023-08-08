import React from "react";
import {
  Rating,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import userIcon from "../../assets/images/users/user-round.svg";

const ReviewHeading = styled("div")(({ theme }) => ({
  fontSize: "70px",
  lineHeight: "106px",
  fontWeight: "700",
  margin: "46px 182px !important",
  [theme.breakpoints.down("md")]: {
    margin: "46px 10px !important",
  },
}));

const Reviews = () => {
  const state = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1400: {
        items: 4,
      },
    },
  };

  return (
    <div style={{ marginTop: "60px", marginBottom: "40px" }}>
      <Box sx={{ marginBottom: "20px" }}>
        <ReviewHeading>
          <p style={{ color: "#1976D2" }}>Happy customers</p>
          <p style={{ color: "#000" }}>us for better</p>
        </ReviewHeading>
      </Box>
      <OwlCarousel
        className="owl-theme customNav"
        loop
        // items={4}
        margin={18}
        nav={false}
        dots={false}
        autoplay={true}
        autoplayTimeout={2000}
        responsive={state.responsive}
      >
        <div className="item">
          <Card
            sx={{
              backgroundColor: "#EAEAEA",
              boxShadow: "0px 3px 10px #0000001A",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Typography
                className="tw-leading-[27px]"
                sx={{
                  fontSize: "18px",
                  letterSpacing: "0px",
                  fontWeight: "normal",
                  fontStyle: "normal",
                  color: "#000",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum malesuada, lorem vitae facilisis tincidunt, enim
                tellus venenatis nisl, quis imperdiet erat tortor quis leo.
              </Typography>
              <div className="tw-flex tw-mt-5 tw-flex-auto tw-flex-row">
                <div className="tw-relative tw-flex tw-items-center tw-w-2/3">
                  <img
                    src={userIcon}
                    alt="YourImage"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#000",
                        marginLeft: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#8B8B8B",
                        marginLeft: "10px",
                      }}
                    >
                      Manager
                    </Typography>
                  </div>
                </div>
                <div className="tw-w-1/2 tw-pb-3 tw-flex tw-end tw-justify-end tw-items-end">
                  <Rating name="read-only" value={5} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="item">
          <Card
            sx={{
              backgroundColor: "#EAEAEA",
              boxShadow: "0px 3px 10px #0000001A",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Typography
                className="tw-leading-[27px]"
                sx={{
                  fontSize: "18px",
                  letterSpacing: "0px",
                  fontWeight: "normal",
                  fontStyle: "normal",
                  color: "#000",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum malesuada, lorem vitae facilisis tincidunt, enim
                tellus venenatis nisl, quis imperdiet erat tortor quis leo.
              </Typography>
              <div className="tw-flex tw-mt-5 tw-flex-auto tw-flex-row">
                <div className="tw-relative tw-flex tw-items-center tw-w-2/3">
                  <img
                    src={userIcon}
                    alt="YourImage"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#000",
                        marginLeft: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#8B8B8B",
                        marginLeft: "10px",
                      }}
                    >
                      Manager
                    </Typography>
                  </div>
                </div>
                <div className="tw-w-1/2 tw-pb-3 tw-flex tw-end tw-justify-end tw-items-end">
                  <Rating name="read-only" value={5} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="item">
          <Card
            sx={{
              backgroundColor: "#EAEAEA",
              boxShadow: "0px 3px 10px #0000001A",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Typography
                className="tw-leading-[27px]"
                sx={{
                  fontSize: "18px",
                  letterSpacing: "0px",
                  fontWeight: "normal",
                  fontStyle: "normal",
                  color: "#000",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum malesuada, lorem vitae facilisis tincidunt, enim
                tellus venenatis nisl, quis imperdiet erat tortor quis leo.
              </Typography>
              <div className="tw-flex tw-mt-5 tw-flex-auto tw-flex-row">
                <div className="tw-relative tw-flex tw-items-center tw-w-2/3">
                  <img
                    src={userIcon}
                    alt="YourImage"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#000",
                        marginLeft: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#8B8B8B",
                        marginLeft: "10px",
                      }}
                    >
                      Manager
                    </Typography>
                  </div>
                </div>
                <div className="tw-w-1/2 tw-pb-3 tw-flex tw-end tw-justify-end tw-items-end">
                  <Rating name="read-only" value={5} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="item">
          <Card
            sx={{
              backgroundColor: "#EAEAEA",
              boxShadow: "0px 3px 10px #0000001A",
              borderRadius: "10px",
            }}
          >
            <CardContent>
              <Typography
                className="tw-leading-[27px]"
                sx={{
                  fontSize: "18px",
                  letterSpacing: "0px",
                  fontWeight: "normal",
                  fontStyle: "normal",
                  color: "#000",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum malesuada, lorem vitae facilisis tincidunt, enim
                tellus venenatis nisl, quis imperdiet erat tortor quis leo.
              </Typography>
              <div className="tw-flex tw-mt-5 tw-flex-auto tw-flex-row">
                <div className="tw-relative tw-flex tw-items-center tw-w-2/3">
                  <img
                    src={userIcon}
                    alt="YourImage"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#000",
                        marginLeft: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#8B8B8B",
                        marginLeft: "10px",
                      }}
                    >
                      Manager
                    </Typography>
                  </div>
                </div>
                <div className="tw-w-1/2 tw-pb-3 tw-flex tw-end tw-justify-end tw-items-end">
                  <Rating name="read-only" value={5} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </OwlCarousel>
    </div>
  );
};

export default Reviews;
