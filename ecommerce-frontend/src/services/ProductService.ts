import type { AxiosError } from "axios";
import { handleApiError } from "../util/ExceptionHandler";
import apiClient from "./ApiClient";
import type { Product } from "../interface/Product";

export const ProductService = {
 
  create: async (data: Product) => {
    try {
      const response = await apiClient.post("/api/products/create", data);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  getAll: async (type : string) => {
    try {
      const response = await apiClient.get(`/api/products/get-all/${type}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/api/products/get-by-id/${id}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  update: async (id: string, data: Product) => {
    try {
      const response = await apiClient.put(`/api/products/update/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/api/products/delete/${id}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  getByCategory: async (categoryId: string) => {
    try {
      const response = await apiClient.get(`/api/products/get-products-for-category/${categoryId}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

   productActivateDeactivate: async (id: string) => {
    try {
      const response = await apiClient.put(`/api/products/activate-deactivate/${id}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

};
