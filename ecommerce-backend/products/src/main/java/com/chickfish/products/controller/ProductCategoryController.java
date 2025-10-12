package com.chickfish.products.controller;

import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.model.ProductCategory;
import com.chickfish.products.service.ProductCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/product-categories")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    @Autowired
    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductCategory>> create(@RequestBody ProductCategory category) {
        ProductCategory created = productCategoryService.createProductCategory(category);
        return ResponseEntity.ok(ApiResponse.<ProductCategory>builder()
                .success(true)
                .message("Product category created successfully")
                .data(created)
                .build());
    }

    @GetMapping("/get-all/{type}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER') or hasRole('NEWVISITOR')")
    public ResponseEntity<ApiResponse<List<ProductCategory>>> getAll(@PathVariable String type) {

        List<ProductCategory> categories;
        String message = "Fetched all product categories";

        switch (type) {
            case "1":
                categories = productCategoryService.getAll();
                break;
            case "2":
                categories = productCategoryService.getProductByActiveStatus(true);
                break;
            case "3":
                categories = productCategoryService.getProductByActiveStatus(false);
                break;
            default:
                return ResponseEntity.badRequest().body(ApiResponse.<List<ProductCategory>>builder()
                        .success(false)
                        .message("Invalid type value. Must be 1, 2, or 3.")
                        .build());
        }

        return ResponseEntity.ok(ApiResponse.<List<ProductCategory>>builder()
                .success(true)
                .message(message)
                .data(categories)
                .build());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<ProductCategory>> getById(@PathVariable String id) {
        ProductCategory category = productCategoryService.getById(id);
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
        ProductCategory updated = productCategoryService.update(id, category);
        return ResponseEntity.ok(ApiResponse.<ProductCategory>builder()
                .success(true)
                .message("Product category updated successfully")
                .data(updated)
                .build());
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable String id) {
        productCategoryService.delete(id);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Product category deleted successfully")
                .data(id)
                .build());
    }

    @PutMapping("/activate-deactivate/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateActivateDeactivate(@PathVariable String id) {
        boolean updated = productCategoryService.updateActivateDeactivate(id);
        if (!updated) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Void>builder()
                            .success(false)
                            .message("Product not found")
                            .build());
        }

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Product status updated successfully")
                .build());
    }
}
