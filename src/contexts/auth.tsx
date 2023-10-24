import { createContext, useContext } from "react";
export interface AuthContextType {
  auth: any;
  updateProfile: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, useAuth };
