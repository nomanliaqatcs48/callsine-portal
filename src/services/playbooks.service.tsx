import http from "./axios";
import { endpoints } from "./endpoints";

export const getTeamPlaybooks = async (teamId: number) => {
  return await http.get(`${endpoints.TEAMS}${teamId}/playbooks`);
};

export const createPlaybooks = async (data: any) => {
  return await http.post(`${endpoints.PLAYBOOKS}`, data);
};
