package com.chickfish.customer.repository;

import com.chickfish.customer.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    @Query("{ 'email': ?0 }")
    Optional<Customer> findByEmail(String email);

    int countByActiveTrue();
}
