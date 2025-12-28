import type { CommonResponse } from "./CommonResponse";

export interface SalesByReligion {
  product_name: string;
  sales_by_religion: Record<string, number>;
  total_quantity: number;
}

export interface SalesByReligionResponse extends CommonResponse {
  data: SalesByReligion[];
}