import { handleApiError } from "../util/ExceptionHandler";
import type { Cart } from "../interface/Cart";
import apiClient from "./ApiClient";
import type { AxiosError } from "axios";
import type { CartItem } from "../interface/CartItem";

export const CartService = {
    create: async (data: Cart) => {
        try {
            const response = await apiClient.post("/api/orders/create", data);
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await apiClient.get("/api/carts/get-all-carts");
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    },
    addOrderItems: async (cartId: string, cartItem: CartItem) => {
        try {
            const response = await apiClient.post(
                `/api/orders/add-item-to-cart/${cartId}`,
                {
                    cartId: cartId,
                    productCode: cartItem.productCode,
                    productName: cartItem.productName,
                    productCategory: cartItem.productCategory,
                    quantity: cartItem.quantity,
                    unitPrice: cartItem.unitPrice,
                    discount: cartItem.discount,
                    rate: cartItem.rate
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("Error adding item to cart:", error);

            return {
                success: false,
                message: error?.response?.data?.message || "Failed to add item to cart",
                data: null
            };
        }
    }
};