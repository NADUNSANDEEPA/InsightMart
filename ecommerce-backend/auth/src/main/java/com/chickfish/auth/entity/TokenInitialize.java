package com.chickfish.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "token_initialize")
public class TokenInitialize {

    @Id
    private String id;

    @Indexed(unique = true)
    private String macAddress;

    private String ipAddress;
    private String token;
    private String timestamp;
}

