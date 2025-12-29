package com.chickfish.orders.service.repository;

import com.chickfish.orders.service.model.Checkout;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckoutRepository extends MongoRepository<Checkout, String> {
}
