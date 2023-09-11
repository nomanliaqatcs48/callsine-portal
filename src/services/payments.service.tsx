import http from "./axios";
import { endpoints } from "./endpoints";

export const createSubscriptionService = async (data: any) => {
  return await http.post(`${endpoints.PAYMENTS}create-subscription/`, data);
};

export const createStripeCustomer = async (data: any) => {
  return await http.post(`${endpoints.PAYMENTS}create-customer/`, data);
};
