import type { AxiosError } from "axios";
import { handleApiError } from "../util/ExceptionHandler";
import apiClient from "./ApiClient";
import type { Stock } from "../interface/Stock";
import type { StockTableRow } from "../interface/StockTableRow";


export const StockService = {
    getStockByProductCode: async (productCode: string) => {
        try {
            const response = await apiClient.get(`/api/stocks/get-by-product-code/${productCode}`);
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    },
    addStock: async (stock: Stock) => {
        try {
            const response = await apiClient.post("/api/stocks/add-stock", stock);
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    },
    getAllStocks: async (): Promise<StockTableRow[]> => {
        try {
            const response = await apiClient.get<StockTableRow[]>(
                "/api/stocks/get-all-stocks"
            );
            return response.data;
        } catch (error: unknown) {
            handleApiError(error as AxiosError);
            throw error;
        }
    }
};