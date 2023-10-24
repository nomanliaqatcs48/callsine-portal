// src/context/TourContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

interface TourContextProps {
  isTourActive: boolean;
  toggleTour: () => void;
}
interface TourProviderProps {
  children: ReactNode;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(true);

  const toggleTour = () => {
    setIsTourActive((prev) => !prev);
  };

  return (
    <TourContext.Provider value={{ isTourActive, toggleTour }}>
      {children}
    </TourContext.Provider>
  );
};

const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};

export { TourProvider, useTour };
