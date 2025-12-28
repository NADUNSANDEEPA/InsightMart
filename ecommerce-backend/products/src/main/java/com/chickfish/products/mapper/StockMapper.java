package com.chickfish.products.mapper;

import com.chickfish.products.dto.StockResponseDTO;
import com.chickfish.products.model.Stock;

public class StockMapper {

    public static StockResponseDTO mapToDTO(Stock stock, String productName) {

        return StockResponseDTO.builder()
                .stockId(stock.getId())
                .productCode(stock.getProductCode())
                .productName(productName)
                .receivedStockKg(stock.getReceivedStockKg())
                .availableStockKg(stock.getAvailableStockKg())
                .pricePerKg(stock.getPricePerKg())
                .discount(stock.getDiscount())
                .discountEligibleWeight(stock.getDiscountEligibleWeight())
                .status(stock.getStatus())
                .createdAt(stock.getCreatedAt())
                .build();
    }


}
