import http from "./axios";
import { endpoints } from "./endpoints";

export const getUsersService = async (
  filters: any,
  searchValue: string = ""
) => {
  return await http.get(
    `${endpoints.USERS}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};
