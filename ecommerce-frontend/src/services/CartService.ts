import { handleApiError } from "../util/ExceptionHandler";
import apiClient from "./ApiClient";
import type { AxiosError } from "axios";
import type { OrderRequest } from "../interface/order/OrderRequest";
import type { CheckOutRequest } from "../interface/CheckOutRequest";

export const CartService = {
    getAll: async () => {
        try {
            const response = await apiClient.get("/api/carts/get-all-carts");
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    },
    addItemsToCart: async (orderRequest: OrderRequest) => {
        try {
            const response = await apiClient.post(
                "/api/orders/add-item-to-cart",
                orderRequest
            );

            return response.data;
        } catch (error: any) {
            console.error("Error adding items to cart:", error);

            return {
                success: false,
                message:
                    error?.response?.data?.message ||
                    "Failed to add items to cart",
                data: null
            };
        }
    },

    getAllOrdersByType: async (type: string, customerId: string) => {
        try {
            const response = await apiClient.get(
                `/api/orders/get-all-order/${type}/${customerId}`
            );
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    },
    checkOutProcess: async (checkoutData: CheckOutRequest) => {
        try {
            const response = await apiClient.post(
                `/api/orders/checkout`,
                checkoutData
            );
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    }
};