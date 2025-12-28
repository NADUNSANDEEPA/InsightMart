import type { ProductCategory } from "./ProductCategory";

export interface Product {
    id: string;
    productCode: string;
    productName: string;
    productDescription: string;
    productCategory: ProductCategory;
    active: boolean;
    imageUrl: string;
}