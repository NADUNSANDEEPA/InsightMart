package com.chickfish.products.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDasboardResponse {
    private int fishProductCount;
    private int meatProductCount;
}
