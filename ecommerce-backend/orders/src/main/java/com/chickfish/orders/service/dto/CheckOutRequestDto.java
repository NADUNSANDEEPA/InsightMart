package com.chickfish.orders.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CheckOutRequestDto {
    private String cartId;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String province;
    private String callingName;
    private String contactNumber;
    private String postalCode;
    private String paymentStatus;
    private String cardNumber;
    private double amount;
}
