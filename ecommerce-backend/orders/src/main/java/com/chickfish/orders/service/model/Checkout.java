package com.chickfish.orders.service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "checkouts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Checkout {
    @Id
    private String id;

    private String cartId;

    private String addressLine1;
    private String addressLine2;
    private String city;
    private String province;
    private String postalCode;
    private String callingName;
    private String contactNumber;

    private String paymentStatus;
    private String cardNumber;
    private double amount;

    private LocalDateTime createdAt;
}
