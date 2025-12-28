export interface DailySale {
  buying_date: string;
  quantity: number;
  rolling_avg: number;
}

export interface TimeBasedSalesResponse {
  success: boolean;
  data: {
    product_name: string;
    start_date: string;
    end_date: string;
    total_sales: number;
    daily_sales: DailySale[];
  };
}
