package com.chickfish.auth.dto;

import com.chickfish.auth.enums.UserRoles;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private UserRoles role;
}