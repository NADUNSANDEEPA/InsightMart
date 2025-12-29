import type { OrderItemRequest } from "./OrderItemRequest";

export interface OrderRequest {
    customerId: string;
    customerAgeGroup: string;
    customerReligion: string;
    city: string;
    province: string;

    paymentMethod: "CARD" | "CASH" | "ONLINE";
    orderStatus: "ACTIVE" | "CANCELLED" | "COMPLETED";
    deliveryType: "HOME_DELIVERY" | "PICKUP";
    deliveryStatus: "PENDING" | "DELIVERED";

    items: OrderItemRequest[];
}
