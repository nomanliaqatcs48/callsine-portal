import React from "react";
import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import "./index.css";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const blogItems = [
    {
      id: 1,
      date: "Aug 1, 2023",
      title:
        "Transforming Sales in the Enterprise: Why Big Companies Should Choose CallSine",
      excerpt:
        "In the modern and complex landscape of enterprise sales, traditional methods can often fall short in...",
      link: "/blog/transforming-sales-in-the-enterprise",
    },
    {
      id: 2,
      date: "Jun 28, 2023",
      title:
        "CallSine vs. The Competition: A New Standard in AI-Driven Emails for Superior Engagement",
      excerpt:
        "In today's digital marketplace, the effectiveness of your email outreach can make or break your sales strategy.",
      link: "/blog/callsine-vs-the-competition",
    },
    {
      id: 3,
      date: "May 17, 2023",
      title:
        "CallSine's Uniqueness in Sales Automation: Harnessing Large Language Modeling, Machine Learning, and AI",
      excerpt:
        "Sales automation has become a cornerstone for modern sales organizations, but not all platforms are created equal.",
      link: "/blog/callsines-uniqueness-in-sales-automation",
    },
    {
      id: 4,
      date: "Apr 28, 2023",
      title:
        "Unleashing AI for Business Development Representatives: How CallSine Saves Time",
      excerpt:
        "Business Development Representatives (BDRs) are the engines that fuel an organization's growth.",
      link: "/blog/unleashing-ai-for-business-development-representatives",
    },
    {
      id: 5,
      date: "Mar 30, 2023",
      title:
        "Elevate Your Email Game with CallSine: Better and More Productive Outreach to Prospects",
      excerpt:
        "In the competitive world of sales and marketing, emails remain a powerful tool for connecting with prospects.",
      link: "/blog/elevate-your-email-game-with-callsine",
    },
    {
      id: 6,
      date: "Mar 8, 2023",
      title:
        "AI Disruption in Sales Engagement and Lead Generation: The Rise of CallSine",
      excerpt:
        "Sales engagement and lead generation have long been critical components of any successful business strategy.",
      link: "/blog/ai-disruption-in-sales-engagement-and-lead-generation",
    },
    {
      id: 7,
      date: "Feb 13, 2023",
      title: "AI in Lead Generation: A New Era of Engagement with CallSine",
      excerpt:
        "In the fast-paced digital age, businesses are constantly searching for innovative ways to enhance their...",
      link: "/blog/ai-in-lead-generation",
    },
    {
      id: 8,
      date: "Jan 3, 2023",
      title: "CallSine: Pioneering the Future of AI-Driven Email Creation",
      excerpt:
        "Email has long been a vital tool in the arsenal of sales and marketing professionals. But in a world...",
      link: "/blog/callsine-pioneering-the-future-of-ai-driven-email-creation",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Blog | CallSine</title>
      </Helmet>
      <Box className="tw-px-[20px] tw-pt-[150px] lg:tw-px-[96px] 2xl:tw-px-[240px]">
        <Typography
          variant="h1"
          className="tw-font-normal lg:tw-text-[80px] lg:tw-leading-[100px]"
        >
          The CallSine Blog
        </Typography>
        <Box className="tw-py-7" />
        <Box className="blog-container tw-flex tw-flex-col tw-gap-y-10">
          {blogItems.map((i: any, idx: number) => {
            return (
              <Box
                key={idx}
                className="tw-flex tw-flex-col tw-gap-y-3 tw-group lg:tw-relative"
              >
                <Typography
                  variant="h6"
                  className="tw-text-[13px] tw-text-[#9e9ea7] tw-font-medium tw-uppercase lg:tw-text-[14px] lg:tw-ml-[230px]"
                >
                  {i?.date}
                </Typography>

                <Typography
                  component={Link}
                  to={i?.link}
                  variant="h2"
                  className="tw-text-[24px] tw-text-black tw-font-medium tw-leading-[1.2] lg:tw-ml-[230px]"
                >
                  {i?.title}
                </Typography>

                <Box
                  className="lg:tw-absolute lg:tw-left-0 lg:tw-top-0 lg:tw-w-[200px]"
                  component={Link}
                  to={i?.link}
                >
                  <img
                    src="https://picsum.photos/id/7/800/600"
                    alt="featured-img"
                    className="tw-max-w-full tw-h-full"
                  />
                </Box>

                <Typography
                  variant="body2"
                  className="tw-text-[15px] tw-text-[#6e6d7a] tw-leading-[1.5] lg:tw-ml-[230px]"
                >
                  {i?.excerpt}
                </Typography>

                <Box className="tw-border tw-border-solid tw-border-[#e0e0e0] tw-p-0 tw-mt-7 xl:tw-mt-[80px]" />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default BlogPage;
