package com.chickfish.customer.controller;

import com.chickfish.customer.dto.ApiResponse;
import com.chickfish.customer.model.Customer;
import com.chickfish.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('NEWVISITOR')")
    public ResponseEntity<ApiResponse<Customer>> createCustomer(@RequestBody Customer customer) {
        Customer created = customerService.createCustomer(customer);
        return ResponseEntity.ok(ApiResponse.<Customer>builder()
                .success(true)
                .message("Customer created successfully")
                .data(created)
                .build());
    }

    @GetMapping("/get-all-customers")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<List<Customer>>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(ApiResponse.<List<Customer>>builder()
                .success(true)
                .message("All customers fetched successfully")
                .data(customers)
                .build());
    }

    @GetMapping("/get-customer/{id}")
    public ResponseEntity<ApiResponse<Customer>> getCustomerById(@PathVariable String id) {
        Customer customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(ApiResponse.<Customer>builder()
                .success(true)
                .message("Customer fetched successfully")
                .data(customer)
                .build());
    }

    @PutMapping("/update-customer/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<Customer>> updateCustomer(@PathVariable String id, @RequestBody Customer customer) {
        Customer updated = customerService.updateCustomer(id, customer);
        return ResponseEntity.ok(ApiResponse.<Customer>builder()
                .success(true)
                .message("Customer updated successfully")
                .data(updated)
                .build());
    }

    @DeleteMapping("/delete-customer/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCustomer(@PathVariable String id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Customer deleted successfully")
                .build());
    }

    @PutMapping("/user-activate-deactivate/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateActivateDeactivate(@PathVariable String id ) {
        boolean updated = customerService.updateActivateDeactivate(id);

        if (!updated) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Void>builder()
                            .success(false)
                            .message("Customer not found")
                            .build());
        }

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Customer status updated successfully")
                .build());
    }
}
