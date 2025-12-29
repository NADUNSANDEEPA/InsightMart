package com.chickfish.orders.service.service;

import com.chickfish.orders.service.dto.ApiResponse;
import com.chickfish.orders.service.dto.CheckOutRequestDto;
import com.chickfish.orders.service.dto.OrderItemRequestDto;
import com.chickfish.orders.service.dto.OrderRequestDto;
import com.chickfish.orders.service.enums.CartStatus;
import com.chickfish.orders.service.enums.DeliveryStatus;
import com.chickfish.orders.service.model.Checkout;
import com.chickfish.orders.service.model.Order;
import com.chickfish.orders.service.model.OrderItem;
import com.chickfish.orders.service.repository.CheckoutRepository;
import com.chickfish.orders.service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CheckoutRepository checkoutRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, CheckoutRepository checkoutRepository) {
        this.orderRepository = orderRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public ApiResponse addItemsToCart(OrderRequestDto orderRequestDto) {

        ApiResponse response = new ApiResponse();
        Order order;

        boolean isOrderAvailable = orderRepository.existsByCustomerIdAndOrderStatus(
                orderRequestDto.getCustomerId(),
                CartStatus.ACTIVE
        );

        if (isOrderAvailable) {
            // Get existing active cart
            order = orderRepository
                    .findByCustomerIdAndOrderStatus(
                            orderRequestDto.getCustomerId(),
                            CartStatus.ACTIVE
                    )
                    .orElseThrow(() -> new RuntimeException("Active cart not found"));

        } else {
            // Create new cart
            order = new Order();
            order.setId(UUID.randomUUID().toString());
            order.setCustomerId(orderRequestDto.getCustomerId());
            order.setCustomerAgeGroup(orderRequestDto.getCustomerAgeGroup());
            order.setCustomerReligion(orderRequestDto.getCustomerReligion());
            order.setCity(orderRequestDto.getCity());
            order.setProvince(orderRequestDto.getProvince());
            order.setPaymentMethod(orderRequestDto.getPaymentMethod());
            order.setDeliveryType(orderRequestDto.getDeliveryType());
            order.setOrderStatus(CartStatus.ACTIVE);
            order.setDeliveryStatus(DeliveryStatus.PENDING);
            order.setCreatedAt(LocalDateTime.now());
        }

        // Map Order Items
        List<OrderItem> currentItems = order.getItems();
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequestDto itemDto : orderRequestDto.getItems()) {
            OrderItem item = new OrderItem();
            item.setId(UUID.randomUUID().toString());
            item.setProductCode(itemDto.getProductCode());
            item.setProductName(itemDto.getProductName());
            item.setProductCategory(itemDto.getProductCategory());
            item.setQuantity(itemDto.getQuantity());
            item.setUnitPrice(itemDto.getUnitPrice());
            item.setDiscount(itemDto.getDiscount());
            item.setRate(itemDto.getRate());
            item.setCreatedAt(LocalDateTime.now());

            orderItems.add(item);
        }

        if (currentItems != null && !currentItems.isEmpty()) {
            orderItems.addAll(currentItems);
        }
        order.setItems(orderItems);

        orderRepository.save(order);

        response.setSuccess(true);
        response.setMessage("Items added to cart successfully");
        response.setData(order.getId());

        return response;
    }

    public List<Order> getOrdersByTypeAndCustomerForDate(String type, String customerId) {
        List<Order> orderList = new ArrayList<>();

        if (Objects.equals(type, "1")) {

        } else if (Objects.equals(type, "2")) {
            Optional<Order> order = orderRepository.findByCustomerIdAndOrderStatus(customerId, CartStatus.ACTIVE);
            order.ifPresent(orderList::add);
        }

        return orderList;
    }

    public Checkout processCheckout(CheckOutRequestDto checkoutDto) {
        Checkout checkout = new Checkout();
        checkout.setId(UUID.randomUUID().toString());
        checkout.setCartId(checkoutDto.getCartId());
        checkout.setAddressLine1(checkoutDto.getAddressLine1());
        checkout.setAddressLine2(checkoutDto.getAddressLine2());
        checkout.setCity(checkoutDto.getCity());
        checkout.setProvince(checkoutDto.getProvince());
        checkout.setPostalCode(checkoutDto.getPostalCode());
        checkout.setCallingName(checkoutDto.getCallingName());
        checkout.setContactNumber(checkoutDto.getContactNumber());
        checkout.setCardNumber(checkoutDto.getCardNumber() != null ? checkoutDto.getCardNumber() : "");
        checkout.setAmount(checkoutDto.getAmount());
        checkout.setPaymentStatus("COMPLETED");

        orderRepository.findById(checkoutDto.getCartId()).ifPresent(order -> {
            order.setOrderStatus(CartStatus.COMPLETED);
            orderRepository.save(order);
        });

        return checkoutRepository.save(checkout);
    }

}
