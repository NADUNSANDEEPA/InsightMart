package com.chickfish.orders.service.repository;

import com.chickfish.orders.service.enums.CartStatus;
import com.chickfish.orders.service.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;


public interface OrderRepository extends MongoRepository<Order, String> {

    @Query(
            value = "{ 'customerId': ?0, 'orderStatus': ?1 }",
            exists = true
    )
    boolean existsByCustomerIdAndOrderStatus(
            String customerId,
            CartStatus orderStatus
    );

    Optional<Order> findByCustomerIdAndOrderStatus(String customerId, CartStatus cartStatus);
}
