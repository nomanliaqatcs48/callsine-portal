import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface TourContextProps {
  isTourActive: boolean;
  startTour: () => void;
  stopTour: () => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Retrieve the initial state from localStorage or default to false
  const [isTourActive, setIsTourActive] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("isTourActive");
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  // This effect runs when the component mounts and when isTourActive changes
  useEffect(() => {
    // Store the state in localStorage whenever it changes
    localStorage.setItem("isTourActive", JSON.stringify(isTourActive));
  }, [isTourActive]);

  const startTour = useCallback(() => setIsTourActive(true), []);
  const stopTour = useCallback(() => setIsTourActive(false), []);

  return (
    <TourContext.Provider value={{ isTourActive, startTour, stopTour }}>
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
