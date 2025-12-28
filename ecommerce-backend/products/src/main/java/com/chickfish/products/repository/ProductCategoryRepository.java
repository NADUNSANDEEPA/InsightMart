package com.chickfish.products.repository;

import com.chickfish.products.model.ProductCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductCategoryRepository extends MongoRepository<ProductCategory, String> {
    List<ProductCategory> findByCategoryName(String categoryName);
}
