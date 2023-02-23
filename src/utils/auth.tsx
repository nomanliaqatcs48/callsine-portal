import { loadString } from "./storage";

export const checkIfAuthenticated = async () => {
  let _auth = await loadString("isAuthenticated");
  let _access = await loadString("access");
  return !!(_auth && _access);
};
