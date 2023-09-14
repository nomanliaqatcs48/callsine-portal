import React from "react";

import imageBgcTop from "../../assets/images/users/Group3.png";
import imageBgc from "../../assets/images/users/Rectangle1.png";
import { useMediaQuery, useTheme } from "@mui/material";

export const Background: React.FC = () => {
  const theme = useTheme();

  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="tw-absolute tw-inset-0">
      <img
        className="tw-h-auto tw-max-w-full"
        src={imageBgcTop}
        alt="description"
        style={{
          position: "fixed",
          zIndex: -1,
          minHeight: downMd ? "calc(100vh + 92px)" : "100vh",
          width: "100%",
          mixBlendMode: "overlay",
          opacity: "0.4",
        }}
      />
      <img
        className="tw-h-auto tw-max-w-full"
        src={imageBgc}
        alt="description"
        style={{
          position: "fixed",
          zIndex: -2,
          minHeight: downMd ? "calc(100vh + 92px)" : "100vh",
          width: "100%",
        }}
      />
    </div>
  );
};
