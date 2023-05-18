import http from "./axios";
import { endpoints } from "./endpoints";

export const bulkImportPeopleService = async (data: any) => {
  return await http.post(`${endpoints.IMPORT_PEOPLE}`, data);
};
