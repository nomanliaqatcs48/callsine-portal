import http from "./axios";
import { endpoints } from "./endpoints";

export const getMailAccountsService = async (
  filters: any,
  searchValue: string = ""
) => {
  return await http.get(
    `${endpoints.MAIL_ACCOUNT}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};

export const getMailAccountDetailService = async (id: number) => {
  return await http.get(`${endpoints.MAIL_ACCOUNT}/${id}/`);
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
