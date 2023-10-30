// src/providers/tourProvider.tsx

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface Bounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TourContextProps {
  isTourActive: boolean;
  startTour: () => void;
  stopTour: () => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isTourActive, setIsTourActive] = useState(false);

  const startTour = useCallback(() => setIsTourActive(true), []);
  const stopTour = useCallback(() => {
    setIsTourActive(false);
  }, []);

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        startTour,
        stopTour,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = (): TourContextProps => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
