package com.chickfish.orders.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemRequestDto {
    private String productCode;
    private String productName;
    private String productCategory;
    private Double quantity;
    private Double unitPrice;
    private Double discount;
    private Integer rate;
}
