import http from "./axios";
import { endpoints } from "./endpoints";

export const getPeopleService = async (
  filters: any,
  searchValue: string,
  sortedId: any,
  isOrderDesc: any,
  searchFilterValue: any
) => {
  let _filters = `?limit=${filters.limit}&offset=${filters.offset}`;
  let _search = `&search=${searchValue}`;
  let _ordering = `&ordering=${
    isOrderDesc === undefined ? "" : isOrderDesc ? "-" + sortedId : sortedId
  }`;
  let _titleFilter = `&job_title=${searchFilterValue?.title}`;
  let _companyFilter = `&org_name=${searchFilterValue?.company}`;
  let _industryFilter = `&org_industry=${searchFilterValue?.industry}`;

  return await http.get(
    `${endpoints.PERSON}${_filters}${_search}${_ordering}${_titleFilter}${_companyFilter}${_industryFilter}`
  );
};

export const createPeopleService = async (data: any) => {
  return await http.post(`${endpoints.PERSON}`, data);
};

export const getPersonDetailService = async (id: number) => {
  return await http.get(`${endpoints.PERSON}${id}/`);
};

export const updatePersonDetailService = async (id: number, data: any) => {
  return await http.put(`${endpoints.PERSON}${id}/`, data);
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
