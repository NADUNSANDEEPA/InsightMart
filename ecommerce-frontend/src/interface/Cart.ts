import type { CartStatusType } from "../types/CartStatusType";
import type { DeliveryStatusType } from "../types/DeliveryStatusType";
import type { CartItem } from "./CartItem";

export interface Cart {
    id: string;
    customerId: string;
    customerAgeGroup: string;
    customerReligion: string;
    city: string;
    province: string;
    buyingDate: string;
    paymentMethod: string;
    orderStatus: CartStatusType;
    deliveryType: string;
    deliveryStatus: DeliveryStatusType;
    createdAt: string;
    items: CartItem[]; 
}