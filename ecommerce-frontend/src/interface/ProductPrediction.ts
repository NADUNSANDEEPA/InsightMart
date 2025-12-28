import type { CommonResponse } from "./CommonResponse";

export interface ProductPredictionResponse extends CommonResponse {
    data: ProductPredictionData;
}

export interface ProductPredictionData {
    approach: "cold_start" | "existing_customer";
    recommendations: Recommendation[];
    customer_id: string;
    has_history: boolean;
    history_summary: HistorySummary;
}

export interface Recommendation {
    score: number;
    imageUrl: string | null;
    stock: Stock | null;
    product_category: string;
    product_code: string;
    product_name: string;
    unit_price: number;
}

export interface Stock {
    id: string;
    productCode: string;
    receivedStockKg: number;
    availableStockKg: number;
    pricePerKg: number;
    discount: number;
    discountEligibleWeight: number;
    createdAt: string;
    status: "ACTIVE" | "INACTIVE";
}

export interface HistorySummary {
    products: ProductHistory[];
    total_sales_records: number;
}

export interface ProductHistory {
    product_code: string;
    count: number;
}
