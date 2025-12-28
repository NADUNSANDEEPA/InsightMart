package com.chickfish.products.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductStockResponseDTO {

    private String productCode;
    private String productName;
    private String productDescription;
    private String imageUrl;
    private String categoryId;
    private boolean active;

    private String stockId;
    private Integer receivedStockKg;
    private Integer availableStockKg;
    private BigDecimal pricePerKg;
    private BigDecimal discount;
    private BigDecimal discountEligibleWeight;
    private String stockStatus;

    // NEW
    private boolean outOfStock;
    private String stockMessage;
}
