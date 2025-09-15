package com.chickfish.customer.service;

import com.chickfish.customer.model.Customer;
import com.chickfish.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(String id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
    }

    public Customer updateCustomer(String id, Customer updatedCustomer) {
        Customer existing = getCustomerById(id);

        existing.setFullName(updatedCustomer.getFullName());
        existing.setAddress(updatedCustomer.getAddress());
        existing.setEmail(updatedCustomer.getEmail());
        existing.setPhone(updatedCustomer.getPhone());
        existing.setPassword(updatedCustomer.getPassword());
        existing.setCity(updatedCustomer.getCity());
        existing.setProvince(updatedCustomer.getProvince());
        existing.setCustomerType(updatedCustomer.getCustomerType());
        existing.setFamilySize(updatedCustomer.getFamilySize());
        existing.setIsThereAllergic(updatedCustomer.getIsThereAllergic());
        existing.setReligion(updatedCustomer.getReligion());

        return customerRepository.save(existing);
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }
}