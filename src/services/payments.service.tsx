import http from "./axios";
import { endpoints } from "./endpoints";

export const createSubscriptionService = async (data: any) => {
  return await http.post(`${endpoints.PAYMENTS}create-subscription/`, data);
};

export const createStripeCustomer = async (data: any) => {
  return await http.post(`${endpoints.PAYMENTS}create-customer/`, data);
};

export const getStripeCards = async (data: any) => {
  return await http.get(`${endpoints.PAYMENTS}billing/cards/`, data);
};

export const deleteStripeCard = async (cardId: string) => {
  return await http.delete(
    `${endpoints.PAYMENTS}stripe/cards/${cardId}/delete/`
  );
};

export const setDefaultStripeCard = async (cardId: string) => {
  return await http.post(
    `${endpoints.PAYMENTS}stripe/cards/${cardId}/set_default/`
  );
};

export const getStripeSubscription = async (data: any) => {
  return await http.get(`${endpoints.PAYMENTS}subscription-info/`, data);
};

export const cancelStripeSubscription = async (data: any) => {
  return await http.post(`${endpoints.PAYMENTS}cancel-subscription/`, data);
};

export const fetchUserInvoices = async () => {
  try {
    const response = await http.get(`${endpoints.PAYMENTS}list-invoices/`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch invoices");
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};
