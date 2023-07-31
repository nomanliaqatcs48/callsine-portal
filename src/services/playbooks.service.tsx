import http from "./axios";
import { endpoints } from "./endpoints";

export const getTeamPlaybooks = async (teamId: number) => {
  return await http.get(`${endpoints.TEAMS}${teamId}/playbooks`);
};
