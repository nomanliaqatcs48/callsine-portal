import React, { createContext, useContext } from "react";

const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
