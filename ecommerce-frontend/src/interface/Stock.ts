import type { StockStatusType } from "../types/StockStatusType";

export interface Stock {
    id: string;
    productCode: string;
    receivedStockKg: number;      
    availableStockKg: number;     
    pricePerKg: number;             
    discount: number;  
    discountEligibleWeight: number;    
    createdAt: string;            
    status: StockStatusType; 
}
