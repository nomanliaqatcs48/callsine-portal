// ProspectSequenceEventService.ts
import http from "./axios";
import { endpoints } from "./endpoints";

export const getProspectSequenceEventService = async (personId: string) => {
  return await http.get(`${endpoints.SEQUENCE_EVENTS}?person.id=${personId}`);
};
