package com.chickfish.orders.service.dto;

import com.chickfish.orders.service.enums.CartStatus;
import com.chickfish.orders.service.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestDto {
    private String customerId;
    private String customerAgeGroup;
    private String customerReligion;
    private String city;
    private String province;
    private List<OrderItemRequestDto> items;
    private String paymentMethod;
    private CartStatus orderStatus;
    private String deliveryType;
    private DeliveryStatus deliveryStatus;
}
