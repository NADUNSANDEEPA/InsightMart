package com.chickfish.orders.service.controller;

import com.chickfish.orders.service.dto.ApiResponse;
import com.chickfish.orders.service.dto.CheckOutRequestDto;
import com.chickfish.orders.service.dto.OrderRequestDto;
import com.chickfish.orders.service.model.Checkout;
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

    @GetMapping("/get-all-order/{type}/{customerId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<List<Order>>> getAllOrdersByTypes(
            @PathVariable("type") String type,
            @PathVariable("customerId") String customerId) {

        try {
            List<Order> orders = orderService.getOrdersByTypeAndCustomerForDate(type, customerId);

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


    @PostMapping("/add-item-to-cart")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse> addItemsToCart(@RequestBody OrderRequestDto orderRequestDto) {
        ApiResponse response = orderService.addItemsToCart(orderRequestDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<Checkout>> checkout(@RequestBody CheckOutRequestDto checkoutDto) {
        try {
            Checkout savedCheckout = orderService.processCheckout(checkoutDto);
            ApiResponse<Checkout> response = new ApiResponse<>(true, "Checkout completed successfully", savedCheckout);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<Checkout> errorResponse = new ApiResponse<>(false, "Failed to process checkout: " + e.getMessage(), null);
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
