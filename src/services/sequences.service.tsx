// ProspectSequenceEventService.ts
import http from "./axios";
import { endpoints } from "./endpoints";

export const getProspectSequenceEventService = async (
  personId: string,
  filters: any,
  searchValue: string = ""
) => {
  return await http.get(
    `${endpoints.SEQUENCE_EVENTS}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}&person.id=${personId}`
  );
};

export const updateProspectSequenceEventDetailService = async (
  id: number,
  personId: number,
  data: any
) => {
  return await http.put(
    `${endpoints.SEQUENCE_EVENTS}${id}/?person.id=${personId}`,
    data
  );
};

export const getSequenceEventScheduledEmailService = async () => {
  return await http.get(
    `${endpoints.SEQUENCE_EVENTS}?scheduledEmail__status=None`
  );
};
