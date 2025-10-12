package com.chickfish.products.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    @Id
    private String productCode;

    private String productName;
    private String productDescription;
    private Double currentPrice;
    private Double currentStock;

    @DBRef
    private ProductCategory productCategory;

    @Builder.Default
    private boolean active = true;
}
