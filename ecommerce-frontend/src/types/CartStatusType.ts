export const CartStatusType = {
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
} as const;

export type CartStatusType = typeof CartStatusType[keyof typeof CartStatusType];
