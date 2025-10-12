package com.chickfish.customer.model;

import com.chickfish.customer.enums.CustomerTypes;
import com.chickfish.customer.enums.Religion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Customer {
    @Id
    private String id;

    private String fullName;
    private String address;
    private String email;
    private String phone;
    private String password;
    private String city;
    private String province;
    private CustomerTypes customerType;
    private Integer familySize;
    private String isThereAllergic;
    private Religion religion;

    @Builder.Default
    private boolean active = true;
}
