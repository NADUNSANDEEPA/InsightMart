package com.chickfish.products.model;

import com.chickfish.products.enums.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "stock")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Stock {

    @Id
    private String id;
    private String productCode;
    private Integer receivedStockKg = 0;
    private Integer availableStockKg = 0;
    private BigDecimal pricePerKg = BigDecimal.ZERO;
    private BigDecimal discount = BigDecimal.ZERO;
    private BigDecimal discountEligibleWeight = BigDecimal.ZERO;
    private LocalDateTime createdAt;
    private StockStatus status;

}
