import React from "react";
import { Box } from "@mui/material";

const PricingFeaturesHeader = ({ item, children, ...props }: any) => {
  return (
    <Box
      className="tw-hidden tw-bg-white  tw-flex-col tw-items-stretch tw-border tw-border-[#dfe1e5] lg:tw-flex lg:tw-flex-row"
      {...props}
    >
      <Box className="title tw-px-[14px] tw-py-[12px] tw-flex-1">
        {item?.title}
      </Box>
      {item?.items.map((i: any, idx: number) => {
        return (
          <Box
            key={idx}
            className="list-item tw-bg-[#f4f5f7] tw-flex tw-justify-between tw-px-[14px] tw-py-[12px] tw-flex-1 tw-border tw-border-[#dfe1e5]"
          >
            <Box>{i?.desc}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PricingFeaturesHeader;
