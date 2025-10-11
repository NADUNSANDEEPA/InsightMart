import type { AxiosError } from "axios";
import { handleApiError } from "../util/ExceptionHandler";
import apiClient from "./apiClient";
import type { ProductCategory } from "../interface/ProductCategory";


export const ProductCategoryService = {
  create: async (data: ProductCategory) => {
    try {
      const response = await apiClient.post("/api/product-categories/create", data);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
    }
  },

  getAll: async () => {
    try {
      const response = await apiClient.get("/api/product-categories/get-all");
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
    }
  },

  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/api/product-categories/${id}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
    }
  },

  update: async (id: string, data: ProductCategory) => {
    try {
      const response = await apiClient.put(`/api/product-categories/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/api/product-categories/${id}`);
      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
    }
  },
};
