import http from "./axios";
import { endpoints } from "./endpoints";

export const loginService = async (data: any) => {
  return await http.post(`${endpoints.LOGIN}`, data);
};

export const signupService = async (data: any) => {
  return await http.post(`${endpoints.SIGNUP}`, data);
};
