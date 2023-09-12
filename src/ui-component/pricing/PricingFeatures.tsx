import React from "react";
import { Box } from "@mui/material";

const PricingFeatures = ({ item, children, ...props }: any) => {
  return (
    <Box
      className="tw-bg-white tw-flex tw-flex-col tw-items-stretch tw-border tw-border-[#dfe1e5] lg:tw-flex-row"
      {...props}
    >
      <Box className="title tw-bg-[#f4f5f7] tw-px-[14px] tw-py-[12px] tw-flex-1">
        {item?.title}
      </Box>
      {item?.items.map((i: any, idx: number) => {
        return (
          <Box
            key={idx}
            className="list-item tw-flex tw-justify-between tw-px-[14px] tw-py-[12px] tw-flex-1 tw-border tw-border-[#dfe1e5] "
          >
            <Box className="lg:tw-hidden">{i?.plan}</Box>
            <Box>{i?.desc}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PricingFeatures;
