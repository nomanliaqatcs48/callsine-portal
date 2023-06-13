import http from "./axios";
import { endpoints } from "./endpoints";

export const getUserDataService = async (
  filters: any,
  searchValue: string = ""
) => {
  return await http.get(
    `${endpoints.USER_DATA}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};
