package com.chickfish.products.controller;

import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.model.ProductCategory;
import com.chickfish.products.service.ProductCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-categories")
@RequiredArgsConstructor
public class ProductCategoryController {

    private final ProductCategoryService service;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<ProductCategory>> create(@RequestBody ProductCategory category) {
        ProductCategory created = service.createProductCategory(category);
        return ResponseEntity.ok(ApiResponse.<ProductCategory>builder()
                .success(true)
                .message("Product category created successfully")
                .data(created)
                .build());
    }

    @GetMapping("/get-all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<List<ProductCategory>>> getAll() {
        List<ProductCategory> categories = service.getAll();
        return ResponseEntity.ok(ApiResponse.<List<ProductCategory>>builder()
                .success(true)
                .message("Fetched all product categories")
                .data(categories)
                .build());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<ProductCategory>> getById(@PathVariable String id) {
        ProductCategory category = service.getById(id);
        return ResponseEntity.ok(ApiResponse.<ProductCategory>builder()
                .success(true)
                .message("Fetched product category")
                .data(category)
                .build());
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<ProductCategory>> update(@PathVariable String id,
                                                               @RequestBody ProductCategory category) {
        ProductCategory updated = service.update(id, category);
        return ResponseEntity.ok(ApiResponse.<ProductCategory>builder()
                .success(true)
                .message("Product category updated successfully")
                .data(updated)
                .build());
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Product category deleted successfully")
                .data(id)
                .build());
    }
}
