package com.chickfish.orders.service.model;

import com.chickfish.orders.service.enums.CartStatus;
import com.chickfish.orders.service.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
    @Id
    private String id;

    private String customerId;
    private String customerAgeGroup;
    private String customerReligion;
    private String city;
    private String province;

    private List<OrderItem> items;

    private LocalDate buyingDate;
    private String paymentMethod;
    private CartStatus orderStatus;
    private String deliveryType;
    private DeliveryStatus deliveryStatus;

    private LocalDateTime createdAt;


}
