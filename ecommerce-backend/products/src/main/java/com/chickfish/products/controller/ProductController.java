package com.chickfish.products.controller;

import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.model.Product;
import com.chickfish.products.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Product>> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return ResponseEntity.ok(ApiResponse.<Product>builder()
                .success(true)
                .message("Product created successfully")
                .data(created)
                .build());
    }

    @GetMapping("/get-all")
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(ApiResponse.<List<Product>>builder()
                .success(true)
                .message("Fetched all products successfully")
                .data(products)
                .build());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.<Product>builder()
                .success(true)
                .message("Product fetched successfully")
                .data(product)
                .build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Product>> updateProduct(@PathVariable String id,
                                                              @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        return ResponseEntity.ok(ApiResponse.<Product>builder()
                .success(true)
                .message("Product updated successfully")
                .data(updated)
                .build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Product deleted successfully.")
                .build());
    }
}
