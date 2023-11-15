import http from "./axios";
import { endpoints } from "./endpoints";

export const getUserDataService = async (
  filters: any,
  searchValue: string = "",
  sortedId: any,
  isOrderDesc: any
) => {
  let _ordering = `&ordering=${
    isOrderDesc === undefined ? "" : isOrderDesc ? "-" + sortedId : sortedId
  }`;

  return await http.get(
    `${endpoints.USER_DATA}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}${_ordering}`
  );
};

export const deleteUserDataService = async (id: number) => {
  return await http.delete(`${endpoints.USER_DATA}${id}/`);
};
