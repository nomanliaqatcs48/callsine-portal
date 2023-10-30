// src/components/TourHighlight.tsx
import React, { ReactNode, useRef } from "react";
import { useTour } from "src/providers/tourprovider";

interface TourHighlightProps {
  children: ReactNode;
}

interface TourHighlightProps {
  children: React.ReactNode;
}

const TourHighlight: React.FC<TourHighlightProps> = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isTourActive } = useTour();

  return <div ref={elementRef}>{children}</div>;
};

export default TourHighlight;
