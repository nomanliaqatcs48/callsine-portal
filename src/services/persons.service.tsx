import http from "./axios";
import { endpoints } from "./endpoints";

export const getPeopleService = async (
  filters: any,
  searchValue: string,
  sortedId: any,
  isOrderDesc: any,
  searchFilterValue: any,
  user_id: any,
  schedEmailNull?: any,
  schedEmailNotNull?: any,
  schedEmailToday?: any,
  lastContactedToday?: any
) => {
  let _filters = `?limit=25&offset=${filters.offset}`;
  let _search = `&first_name=${searchValue}`;
  let _ordering = `&ordering=${
    isOrderDesc === undefined ? "" : isOrderDesc ? "-" + sortedId : sortedId
  }`;
  let _titleFilter = `&job_title=${searchFilterValue?.title}`;
  let _companyFilter = `&org_name=${searchFilterValue?.company}`;
  let _industryFilter = `&org_industry=${searchFilterValue?.industry}`;
  let _userFilter = user_id ? `&assigned_user=${user_id}` : "";
  let _has_null_next_scheduled_email = schedEmailNull
    ? "&has_null_next_scheduled_email=true"
    : "";
  let _not_null_next_scheduled_email = schedEmailNotNull
    ? "&not_null_next_scheduled_email=true"
    : "";
  let _next_scheduled_email_today = schedEmailToday
    ? "&next_scheduled_email_today=true"
    : "";
  let _last_contacted_today = lastContactedToday
    ? "&last_contacted_today=true"
    : "";
  const url = `${endpoints.PERSON}${_filters}${_search}${_ordering}${_titleFilter}${_companyFilter}${_industryFilter}${_userFilter}${_has_null_next_scheduled_email}${_not_null_next_scheduled_email}${_next_scheduled_email_today}${_last_contacted_today}`;


  const finalUrl = url.endsWith("&") ? url.slice(0, -1) : url;

  return await http.get(finalUrl);

  // return await http.get(
  //   `${endpoints.PERSON}${_filters}${_search}${_ordering}${_titleFilter}${_companyFilter}${_industryFilter}${_userFilter}`
  // );
};

export const createPeopleService = async (payload: any) => {
  return await http.post(`${endpoints.PERSON}`, payload);
};

export const getPersonDetailService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/`);
};

export const updatePersonDetailService = async (
  id: number,
  payload: any
): Promise<any> => {
  return await http.put(`${endpoints.PERSON}${id}/`, payload);
};

export const patchPersonDetailService = async (id: number, payload: any) => {
  const response = await http.patch(`${endpoints.PERSON}${id}/`, payload);
  return response.data;
};

export const deletePersonDetailService = async (id: number) => {
  return await http.delete(`${endpoints.PERSON}${id}/`);
};

export const getPersonDetailStatService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/stats/`);
};

export const getPersonDetailTrackingService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/tracking/`);
};

export const regeneratePlaybookService = async (id: number) => {
  return await http.post(`${endpoints.PERSON}${id}/create_playbook/`);
};

export const sendNewPrompt = async (payload: any) => {
  return await http.post(`${endpoints.NEWPROMPT}`, payload);
};

export const personUpdateAssign = async (personId: number, userId: any) => {
  const data = { user_id: userId };
  return await http.patch(`${endpoints.PERSON}${personId}/assign/`, data);
};

export const personCount = async () => {
  return await http.get(`${endpoints.COUNT_PERSON}`);
};
