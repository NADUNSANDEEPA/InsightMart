package com.chickfish.products.dto;
import com.chickfish.products.enums.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockResponseDTO {

    private String stockId;

    private String productCode;
    private String productName;

    private Integer receivedStockKg;
    private Integer availableStockKg;

    private BigDecimal pricePerKg;
    private BigDecimal discount;
    private BigDecimal discountEligibleWeight;

    private StockStatus status;
    private LocalDateTime createdAt;
}

