import http from "./axios";
import { endpoints } from "./endpoints";

export const getMailAccountsService = async (
  filters: any,
  searchValue: string = "",
  sortedId: any,
  isOrderDesc: any
) => {
  let _filters = `?limit=${filters.limit}&offset=${filters.offset}`;
  let _search = `&search=${searchValue}`;
  let _ordering = `&ordering=${
    isOrderDesc === undefined ? "" : isOrderDesc ? "-" + sortedId : sortedId
  }${
    sortedId === "first_name"
      ? isOrderDesc === undefined
        ? ""
        : isOrderDesc
        ? ",-last_name"
        : ",last_name"
      : ""
  }`;

  return await http.get(
    `${endpoints.MAIL_ACCOUNT}${_filters}${_search}${_ordering}`
  );
};

export const getMailAccountDetailService = async (id: number) => {
  return await http.get(`${endpoints.MAIL_ACCOUNT}${id}/`);
};

export const createMailAccountService = async (data: any) => {
  return await http.post(`${endpoints.MAIL_ACCOUNT}`, data);
};

export const updateMailAccountService = async (id: number, data: any) => {
  return await http.put(`${endpoints.MAIL_ACCOUNT}${id}/`, data);
};

export const deleteMailAccountService = async (id: number) => {
  return await http.delete(`${endpoints.MAIL_ACCOUNT}${id}/`);
};

export const testMailAccountService = async (id: number) => {
  return await http.post(`${endpoints.MAIL_ACCOUNT}${id}/test/`);
};
