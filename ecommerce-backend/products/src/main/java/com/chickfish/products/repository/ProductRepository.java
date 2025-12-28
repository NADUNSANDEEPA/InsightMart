package com.chickfish.products.repository;

import com.chickfish.products.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByProductCategoryId(String categoryId);

    @Query("{ 'productCategory.$id': ?0, 'active': true }")
    List<Product> findActiveProductsByCategoryId(String categoryId);

    @Query(value = "{ 'productName': ?0 }", sort = "{ 'createdAt': -1 }")
    Product findByProductName(String productName);
}
