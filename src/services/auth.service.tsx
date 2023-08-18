import http from "./axios";
import { endpoints } from "./endpoints";

export const loginService = async (data: any) => {
  return await http.post(`${endpoints.LOGIN}`, data);
};

export const signupService = async (data: any) => {
  return await http.post(`${endpoints.SIGNUP}`, data);
};

export const microsoftAuthService = async (payload: any): Promise<any> => {
  return await http.post(`${endpoints.MICROSOFTAUTH}`, payload);
};

export const googleAuthService = async (payload: any): Promise<any> => {
  return await http.post(`${endpoints.GOOGLEAUTH}`, payload);
};
