import http from "./axios";
import { endpoints } from "./endpoints";

export const getOrgsService = async (filters: any, searchValue: string) => {
  return await http.get(
    `${endpoints.ORGS}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
  );
};

export const getOrgDetailService = async (id: number) => {
  return await http.get(`${endpoints.ORGS}${id}/`);
};

export const createOrgService = async (data: any) => {
  return await http.post(`${endpoints.ORGS}`, data);
};

export const updateOrgService = async (id: number, data: any) => {
  return await http.put(`${endpoints.ORGS}${id}/`, data);
};

export const deleteOrgService = async (id: number) => {
  return await http.delete(`${endpoints.ORGS}${id}/`);
};
