import React, { CSSProperties } from "react";
import { useTour } from "src/providers/tourprovider";

interface TourHighlightProps {
  text: string;
}

const TourHighlight: React.FC<React.PropsWithChildren<TourHighlightProps>> = ({
  text,
  children,
}) => {
  const { isTourActive } = useTour();

  const highlightStyle: CSSProperties = {
    animation: isTourActive ? "flashing 1.5s infinite" : undefined,
    border: isTourActive ? "8px solid #F28500" : undefined,
    padding: isTourActive ? "10px" : undefined,
    borderRadius: "15px",
    position: "relative",
  };

  return (
    <div style={highlightStyle} title={isTourActive ? text : undefined}>
      {children}
    </div>
  );
};

export default TourHighlight;
