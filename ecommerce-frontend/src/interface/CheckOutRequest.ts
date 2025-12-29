export interface CheckOutRequest {
    cartId: string;
    addressLine1: string;
    addressLine2?: string; 
    city: string;
    province: string;
    postalCode?: string; 
    callingName: string;
    contactNumber: string;
    paymentStatus?: string;
    cardNumber?: string;
    amount: number;
}