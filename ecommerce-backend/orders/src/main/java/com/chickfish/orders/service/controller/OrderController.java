package com.chickfish.orders.service.controller;

import com.chickfish.orders.service.dto.ApiResponse;
import com.chickfish.orders.service.model.Order;
import com.chickfish.orders.service.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody Order order) {
        try {
            Order createdOrder = orderService.createOrder(order);
            ApiResponse<Order> response = new ApiResponse<>(
                    true,
                    "Order created successfully",
                    createdOrder
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<Order> errorResponse = new ApiResponse<>(
                    false,
                    "Failed to create order: " + e.getMessage(),
                    null
            );
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }


    @GetMapping("/get-today-all-order")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Order>>> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            ApiResponse<List<Order>> response = new ApiResponse<>(
                    true,
                    "Orders fetched successfully",
                    orders
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<Order>> errorResponse = new ApiResponse<>(
                    false,
                    "Failed to fetch orders: " + e.getMessage(),
                    null
            );
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
