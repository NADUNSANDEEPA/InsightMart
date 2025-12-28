import axios, { AxiosError } from "axios";
import type { SalesByProvince, SalesByProvinceResponse } from "../interface/SalesByProvince";
import type { SalesByReligion, SalesByReligionResponse } from "../interface/SalesByReligion";
import type { DailySale, TimeBasedSalesResponse } from "../interface/TimeBasedSales";

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

export class ChartService {

    static async getSalesByReligion(
        startDate: string,
        endDate: string
    ): Promise<SalesByReligion[]> {
        
        try {
            const response = await apiClient.post<SalesByReligionResponse>(
                "/chart/api/sales/by-religion",
                {
                    start_date: startDate,
                    end_date: endDate,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch sales data");
            }

            return response.data.data;
        } catch (error: unknown) {
            console.error("Error fetching sales by religion:", error);
            throw error as AxiosError;
        }
    }

    static async getSalesByProvince(
        startDate: string,
        endDate: string
    ): Promise<SalesByProvince[]> {
        try {
            const response = await apiClient.post<SalesByProvinceResponse>(
                "/chart/api/sales/by-province",
                {
                    start_date: startDate,
                    end_date: endDate,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to fetch sales by province");
            }

            return response.data.data;
        } catch (error: unknown) {
            console.error("Error fetching sales by province:", error);
            throw error as AxiosError;
        }
    }

    static async getTimeBasedSales(
        startDate: string,
        endDate: string,
        productName: string
    ): Promise<DailySale[]> {
        try {
            const response = await apiClient.post<TimeBasedSalesResponse>(
                "/chart/api/sales/time-based",
                {
                    start_date: startDate,
                    end_date: endDate,
                    product_name: productName,
                }
            );

            if (!response.data.success) {
                throw new Error("Failed to load time-based sales");
            }

            return response.data.data.daily_sales;
        } catch (error) {
            console.error("Time-based sales API error:", error);
            throw error as AxiosError;
        }
    }
}
