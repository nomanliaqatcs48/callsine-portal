// ProspectSequenceEventService.ts
import http from "./axios";
import { endpoints } from "./endpoints";

export const getProspectSequenceEventService = async (
  personId: string,
  filters: any,
  searchValue: string = ""
) => {
  return await http.get(
    `${endpoints.SEQUENCE_EVENTS}?person.id=${personId}?limit=${filters.limit}&offset=${filters.offset}&search=${searchValue}`
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
