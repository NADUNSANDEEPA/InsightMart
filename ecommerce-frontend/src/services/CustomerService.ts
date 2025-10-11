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
};