import http from "./axios";
import { endpoints } from "./endpoints";

export const profileService = async () => {
  return await http.get(`${endpoints.PROFILE}`);
};

export const getUsersMeService = async () => {
  return await http.get(`${endpoints.USERS_ME}`);
};

export const patchUsersMeService = async (data: any) => {
  return await http.post(`${endpoints.PROFILE}`, data);
};

export const postUsersMeService = async (data: any) => {
  return await http.post(`${endpoints.USERS_ME}`, data);
};

export const getTeamMeService = async () => {
  return await http.get(`${endpoints.TEAMS}`);
};

export const updateTeamMeService = async (data: any) => {
  return await http.post(`${endpoints.TEAMS}update-team/`, data);
};
