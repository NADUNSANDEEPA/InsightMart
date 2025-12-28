import type { AxiosError, AxiosResponse } from "axios";
import { handleApiError } from "../util/ExceptionHandler";
import apiClient from "./ApiClient";
import type { Product } from "../interface/Product";
import type { ProductStock } from "../interface/ProductStock";
import type { ProductPredictionResponse } from "../interface/ProductPrediction";

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

  getAll: async (type: string) => {
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

  getProductForDisplayForCustomers: async (
    categoryId: string
  ): Promise<ProductStock[]> => {
    try {
      if (!categoryId) {
        throw new Error("Category ID is required");
      }

      const response =
        await apiClient.get(
          `/api/products/get-product-for-show-customers/${categoryId}`
        );

      return response.data.data ?? [];
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  productPrediction: async (
    customerId: string,
    customerAgeGroup: string,
    customerReligion: string,
    familySize: number,
    city: string,
    province: string
  ): Promise<ProductPredictionResponse> => {
    try {
      const response = await apiClient.post(
        "/api/products/predict",
        {
          customer_id: customerId,
          customer_age_group: customerAgeGroup,
          customer_religion: customerReligion,
          family_size: familySize,
          city: city,
          province: province
        }
      );

      return response.data;
    } catch (error: unknown) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  getProductCount: async () => {
    try {
      const response = await apiClient.get(`/api/products/admin-dashboard/load-products-counts`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch customer count", error);
      throw error;
    }
  }

};
