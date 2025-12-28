export const DeliveryStatusType = {
    PENDING: "PENDING",
    STARTED: "STARTED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED"
} as const;

export type DeliveryStatusType = typeof DeliveryStatusType[keyof typeof DeliveryStatusType];
