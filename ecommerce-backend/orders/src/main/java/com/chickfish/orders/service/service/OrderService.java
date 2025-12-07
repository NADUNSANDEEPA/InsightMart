package com.chickfish.orders.service.service;

import com.chickfish.orders.service.model.Order;
import com.chickfish.orders.service.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public Order createOrder(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order data cannot be null");
        }

        if (order.getCreatedAt() == null) {
            order.setCreatedAt(LocalDateTime.now());
        }

        if (order.getOrderStatus() == null || order.getOrderStatus().isEmpty()) {
            order.setOrderStatus("Pending");
        }

        return orderRepository.save(order);
    }


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
