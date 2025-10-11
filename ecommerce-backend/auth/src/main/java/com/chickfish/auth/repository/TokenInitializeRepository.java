package com.chickfish.auth.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.chickfish.auth.entity.TokenInitialize;

import java.util.Optional;

public interface TokenInitializeRepository extends MongoRepository<TokenInitialize, String> {
    Optional<TokenInitialize> findByMacAddress(String macAddress);
}
