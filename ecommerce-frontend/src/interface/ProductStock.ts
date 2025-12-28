import { StockStatusType } from "../types/StockStatusType";

export interface ProductStock {
    productCode: string;
    productName: string;
    productDescription: string;
    imageUrl: string;
    categoryId: string;
    active: boolean;

    stockId: string;
    receivedStockKg: number;
    availableStockKg: number;
    pricePerKg: number;
    discount: number;
    discountEligibleWeight: number;
    stockStatus: StockStatusType;
}
