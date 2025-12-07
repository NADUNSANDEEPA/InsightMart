package com.chickfish.orders.service.repository;

import com.chickfish.orders.service.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

}
