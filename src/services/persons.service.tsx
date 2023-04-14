import http from "./axios";
import { endpoints } from "./endpoints";

export const getPeopleService = async () => {
  return await http.get(`${endpoints.PERSON}`);
};

export const getPersonDetailService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/`);
};

export const updatePersonDetailService = async (id: number, data: any) => {
  return await http.put(`${endpoints.PERSON}${id}/`, data);
};

export const getPersonDetailStatService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/stats/`);
};

export const regeneratePlaybookService = async (id: number) => {
  return await http.post(`${endpoints.PERSON}${id}/create_playbook/`);
};
