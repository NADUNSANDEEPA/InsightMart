package com.chickfish.orders.service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItem {
    private String id;
    private String productCode;
    private String productName;
    private String productCategory;
    private Double quantity;
    private Double unitPrice;
    private Double discount;
    private Integer rate;
    private LocalDateTime createdAt;
}
