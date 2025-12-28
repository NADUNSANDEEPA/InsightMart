package com.chickfish.orders.service.service;

import com.chickfish.orders.service.dto.ApiResponse;
import com.chickfish.orders.service.enums.CartStatus;
import com.chickfish.orders.service.model.Order;
import com.chickfish.orders.service.model.OrderItem;
import com.chickfish.orders.service.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public ApiResponse createOrder(Order order) {
        ApiResponse response = new ApiResponse();
        try {
            String customerId = order.getCustomerId();
            boolean isActiveCartAvailable =
                    orderRepository.existsByCustomerIdAndOrderStatus(
                            customerId,
                            CartStatus.ACTIVE
                    );

            if (isActiveCartAvailable) {
                response.setSuccess(false);
                response.setMessage("An active cart already exists for this customer.");
                return response;
            }

            order.setOrderStatus(CartStatus.ACTIVE);
            order.setCreatedAt(LocalDateTime.now());

            orderRepository.save(order);
            response.setSuccess(true);
            response.setMessage("Order created successfully.");
            response.setData(order);
            return response;
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public ApiResponse addItemsToCart(String cartId, OrderItem orderItem) {
        if (orderItem == null || orderItem.getQuantity() == null || orderItem.getQuantity() <= 0) {
            return ApiResponse.builder()
                    .success(false)
                    .message("Invalid order item data")
                    .data(null)
                    .build();
        }

        Order order = (Order) orderRepository
                .findByIdAndOrderStatus(cartId, CartStatus.ACTIVE)
                .orElseThrow(() ->
                        new IllegalStateException("Active cart not found")
                );

        List<OrderItem> items = order.getItems();
        if(items.isEmpty()){
            items = new ArrayList<>();
            items.add(orderItem);
        } else {
            items.add(orderItem);
        }
        order.setItems(items);

        orderRepository.save(order);

        return ApiResponse.builder()
                .success(true)
                .message("Item added to cart successfully")
                .data(order)
                .build();
    }

}
