import http from "./axios";
import { endpoints } from "./endpoints";

export const personsService = async () => {
  return await http.get(`${endpoints.PERSON}`);
};

export const personDetailService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/`);
};

export const regeneratePlaybookService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/create_playbook/`);
};
