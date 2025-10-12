import type { ProductCategory } from "./ProductCategory";

export interface Product {
    id: string;
    productCode: string;
    productName: string;
    productDescription: string;
    currentPrice: number;
    currentStock: number;
    productCategory: ProductCategory;
    active: boolean;
}