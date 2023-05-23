import http from "./axios";
import { endpoints } from "./endpoints";

export const profileService = async () => {
  return await http.get(`${endpoints.PROFILE}`);
};

export const getUsersMeService = async () => {
  return await http.get(`${endpoints.USERS_ME}`);
};

export const postUsersMeService = async (data: any) => {
  return await http.post(`${endpoints.USERS_ME}`, data);
};
