import http from "./axios";
import { endpoints } from "./endpoints";

export const personsService = async () => {
  return await http.get(`${endpoints.PERSON}`);
};
