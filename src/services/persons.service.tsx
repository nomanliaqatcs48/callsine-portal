import http from "./axios";
import { endpoints } from "./endpoints";

export const getPeopleService = async () => {
  return await http.get(`${endpoints.PERSON}`);
};

export const getPersonDetailService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/`);
};

export const regeneratePlaybookService = async (id: number) => {
  return await http.post(`${endpoints.PERSON}${id}/create_playbook/`);
};
