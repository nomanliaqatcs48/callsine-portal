import http from "./axios";
import { endpoints } from "./endpoints";

export const getTeamPlaybooks = async (
  teamId: number,
  filters: any,
  searchValue: string
) => {
  return await http.get(
    `${endpoints.TEAMS}${teamId}/playbooks/?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};
