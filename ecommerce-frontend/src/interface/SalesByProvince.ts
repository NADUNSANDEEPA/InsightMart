import type { CommonResponse } from "./CommonResponse";

export interface SalesByProvince {
  product_name: string;
  sales_by_province: Record<string, number>;
}

export interface SalesByProvinceResponse extends CommonResponse{
  data: SalesByProvince[];
}