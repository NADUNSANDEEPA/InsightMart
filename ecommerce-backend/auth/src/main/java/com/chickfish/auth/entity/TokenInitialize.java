package com.chickfish.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tokenInitialize")
public class TokenInitialize {

    @Id
    private String id;
    private String ipAddress;
    private String macAddress;
    private String token;
    private String timestamp;

}
