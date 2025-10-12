import { handleApiError } from "../util/ExceptionHandler";
import type { Customer } from "../interface/Customer";
import apiClient from "./ApiClient";
import type { AxiosError } from "axios";


export const CustomerService = {
  create: async (data: Customer) => {
    try {
      const response = await apiClient.post("/api/customers/create", data);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await apiClient.get("/api/customers/get-all-customers");
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  userActivateDeactivate: async (id: string) => {
    try {
      const response = await apiClient.put(`/api/customers/user-activate-deactivate/${id}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

};