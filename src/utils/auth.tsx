import { loadString } from "./storage";

export const checkIfAuthenticated = async (): Promise<boolean> => {
  let _auth = await loadString("isAuthenticated");
  let _access = await loadString("token");
  return !(!_auth || !_access);
};
