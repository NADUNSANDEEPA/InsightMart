package com.chickfish.products.repository;

import com.chickfish.products.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByProductCategory_Id(String categoryId);
}
