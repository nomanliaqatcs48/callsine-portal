import http from "./axios";
import { endpoints } from "./endpoints";

export const loginService = async (data: any) => {
  return await http.post(`${endpoints.LOGIN}`, data);
};

export const signupService = async (data: any) => {
  return await http.post(`${endpoints.SIGNUP}`, data);
};

interface GoogleAuthPayload {
  google_token: string;
}
interface Tokens {
  refresh_token: string;
  access_token: string;
  user: string;
}
interface GoogleEndpointResponse {
  data: Tokens;
}

export const googleAuthService = async (
  payload: GoogleAuthPayload
): Promise<GoogleEndpointResponse> => {
  return await http.post(`${endpoints.GOOGLEAUTH}`, payload);
};

export const microsoftAuthService = async (payload: any): Promise<any> => {
  return await http.post(`${endpoints.MICROSOFTAUTH}`, payload);
};
