import { loadString } from "./storage";

export const checkIfAuthenticated = () => {
  let _auth: any = loadString("isAuthenticated");
  let _access: any = loadString("access");
  return !!(_auth && _access);
};
