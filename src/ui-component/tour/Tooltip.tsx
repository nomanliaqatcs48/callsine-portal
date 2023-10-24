import { Tooltip } from "@mui/material";
import React from "react";
import { useTour } from "src/providers/tourprovider";

interface TooltipProps {
  text: string;
}

const TooltipComponent: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  text,
  children,
}) => {
  const { isTourActive } = useTour();

  return (
    <div style={{ position: "relative" }}>
      <Tooltip title={isTourActive ? text : ""} arrow>
        <div>{children}</div>
      </Tooltip>
    </div>
  );
};

export default TooltipComponent;
