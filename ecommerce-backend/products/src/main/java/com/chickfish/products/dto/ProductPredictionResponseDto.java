package com.chickfish.products.dto;

import com.chickfish.products.model.ProductCategory;
import com.chickfish.products.model.Stock;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductPredictionResponseDto {

    private String approach;

    @JsonProperty("customer_id")
    private String customerId;

    @JsonProperty("has_history")
    private boolean hasHistory;

    @JsonProperty("history_summary")
    private HistorySummary historySummary;

    private List<Recommendation> recommendations;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HistorySummary {

        @JsonProperty("total_sales_records")
        private int totalSalesRecords;

        private List<ProductHistory> products;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductHistory {

        @JsonProperty("product_code")
        private String productCode;

        private int count;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Recommendation {

        @JsonProperty("product_category")
        private String productCategory;

        @JsonProperty("product_code")
        private String productCode;

        @JsonProperty("product_name")
        private String productName;

        private double score;

        @JsonProperty("unit_price")
        private double unitPrice;

        private String imageUrl;

        private Stock stock;
    }
}
