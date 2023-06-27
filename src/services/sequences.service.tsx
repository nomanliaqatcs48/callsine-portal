// ProspectSequenceEventService.ts
import http from "./axios";
import { endpoints } from "./endpoints";
import { load } from "../utils/storage";

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

export const getSequenceEventScheduledEmailService = async (
  filters: any,
  searchValue: string = "",
  is_dashboard: boolean = false
) => {
  let _profile: any = await load("profile");
  let _filters = `?limit=${filters.limit}&offset=${filters.offset}`;
  let _search = `&search=${searchValue}`;

  return await http.get(
    `${endpoints.SEQUENCE_EVENTS}${_filters}${_search}&scheduledEmail__status=&user__id=${_profile?.id}&is_dashboard=${is_dashboard}`
  );
};
