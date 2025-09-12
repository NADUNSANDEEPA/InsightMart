package com.chickfish.products.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Products {

    @Id
    private String productCode;

    private String productName;
    private String productDescription;
    private Double currentPrice;
    private Double currentStock;

    @DBRef
    private ProductCategory productCategory;

}
