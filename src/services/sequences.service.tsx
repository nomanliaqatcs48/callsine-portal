// ProspectSequenceEventService.ts
import http from "./axios";
import { endpoints } from "./endpoints";

export const getProspectSequenceEventService = async (
  user: string,
  personId: string
) => {
  return await http.get(
    `${endpoints.SEQUENCE_EVENTS}?user=${user}&person.id=${personId}`
  );
};
