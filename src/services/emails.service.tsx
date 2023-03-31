import http from "./axios";
import { endpoints } from "./endpoints";

export const getEmailsService = async (
  personId: number,
  filters: any,
  searchValue: string
) => {
  return await http.get(
    `${endpoints.EMAILS}?person=${personId}&limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};

export const getEmailDetailService = async (id: number, personId: number) => {
  return await http.get(`${endpoints.EMAILS}${id}/?person=${personId}`);
};

export const createEmailService = async (personId: number, data: any) => {
  return await http.post(`${endpoints.EMAILS}?person=${personId}`, data);
};

export const updateEmailService = async (
  personId: number,
  id: number,
  data: any
) => {
  return await http.put(`${endpoints.EMAILS}${id}/?person=${personId}`, data);
};

export const deleteEmailService = async (personId: number, id: number) => {
  return await http.delete(`${endpoints.EMAILS}${id}/?person=${personId}`);
};

export const createAsEmailService = async (data: any) => {
  return await http.post(`${endpoints.EMAILS}`, data);
};
