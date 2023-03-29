import http from "./axios";
import { endpoints } from "./endpoints";

export const getEmailsService = async (
  filters: any,
  searchValue: string = ""
) => {
  return await http.get(
    `${endpoints.EMAILS}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};

export const getEmailDetailService = async (id: number) => {
  return await http.get(`${endpoints.EMAILS}/${id}/`);
};

export const createEmailService = async (data: any) => {
  return await http.post(`${endpoints.EMAILS}`, data);
};

export const updateEmailService = async (id: number, data: any) => {
  return await http.put(`${endpoints.EMAILS}${id}/`, data);
};

export const deleteEmailService = async (id: number) => {
  return await http.delete(`${endpoints.EMAILS}${id}/`);
};
