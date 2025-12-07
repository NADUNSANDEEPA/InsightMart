package com.chickfish.orders.service.model;

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

    private Integer customerId;
    private String customerAgeGroup;
    private String customerReligion;
    private String city;
    private String province;

    private List<OrderItem> items;

    private LocalDate buyingDate;
    private String paymentMethod;
    private String orderStatus;
    private String deliveryType;
    private String deliveryStatus;

    private LocalDateTime createdAt;


}
