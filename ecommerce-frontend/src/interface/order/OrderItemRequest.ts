export interface OrderItemRequest {
  productCode: string;
  productName: string;
  productCategory: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  rate: number;
}
