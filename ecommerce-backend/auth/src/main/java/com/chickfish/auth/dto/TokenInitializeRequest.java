package com.chickfish.auth.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TokenInitializeRequest {
    private String id;
    private String ipAddress;
    private String macAddress;
    private String token;
    private String timestamp;
}
