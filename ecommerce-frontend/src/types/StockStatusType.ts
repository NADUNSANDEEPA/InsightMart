
export const StockStatusType = {
    ACTIVE: "ACTIVE",
    PENDING_ACTIVE: "PENDING_ACTIVE",
    INACTIVE: "INACTIVE",
    CLOSED: "CLOSED"
} as const;

export type StockStatusType = typeof StockStatusType[keyof typeof StockStatusType];