package com.chickfish.products.repository;

import com.chickfish.products.enums.StockStatus;
import com.chickfish.products.model.Stock;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends MongoRepository<Stock, String> {

    Optional<Stock> findByProductCode(String productCode);

    boolean existsByProductCode(String productCode);

    @Query("{ 'productCode': ?0, 'status': 'ACTIVE' }")
    List<Stock> findActiveProduct(String productCode);

    @Query("{ 'productCode': ?0, 'status': { $in: ['ACTIVE', 'PENDING_ACTIVE'] } }")
    List<Stock> findActiveOrPendingByProductCode(String productCode);


    @Query(value = "{ 'productCode': ?0 }", sort = "{ 'createdAt': -1 }")
    Optional<Stock> findLastAddedByProductCode(String productCode);

    Optional<Stock> findFirstByProductCodeAndStatusOrderByCreatedAtDesc(String productCode, StockStatus stockStatus);
}
