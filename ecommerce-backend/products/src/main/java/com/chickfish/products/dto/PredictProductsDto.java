package com.chickfish.products.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PredictProductsDto {

    @JsonProperty("customer_id")
    private String customerId;

    @JsonProperty("customer_age_group")
    private String customerAgeGroup;

    @JsonProperty("customer_religion")
    private String customerReligion;

    @JsonProperty("family_size")
    private int familySize;

    @JsonProperty("city")
    private String city;

    @JsonProperty("province")
    private String province;
}
