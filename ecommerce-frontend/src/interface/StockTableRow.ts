export interface StockTableRow {
    stockId: string;
    productCode: string;
    productName: string;
    receivedStockKg: number;
    availableStockKg: number;
    pricePerKg: number;
    discount: number;
    discountEligibleWeight: number;
    status: string;
    createdAt: string;
}
