import { loadString } from "./storage";

export const checkIfAuthenticated = async (): Promise<boolean> => {
  let _auth = await loadString("isAuthenticated");
  let _access = await loadString("access");
  console.log("_auth", _auth);
  console.log("_access", _access);
  return !!(_auth && _access);
};
