import http from "./axios";
import { endpoints } from "./endpoints";

export const profileService = async () => {
  return await http.get(`${endpoints.PROFILE}`);
};
