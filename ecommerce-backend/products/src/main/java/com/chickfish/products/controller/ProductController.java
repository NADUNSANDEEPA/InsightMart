package com.chickfish.products.controller;

import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.model.Product;
import com.chickfish.products.model.ProductCategory;
import com.chickfish.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Product>> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return ResponseEntity.ok(ApiResponse.<Product>builder()
                .success(true)
                .message("Product created successfully")
                .data(created)
                .build());
    }

    @GetMapping("/get-all/{type}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER') or hasRole('NEWVISITOR')")
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts(@PathVariable String type) {

        List<Product> products;
        String message = "Fetched all products successfully";

        switch (type) {
            case "1":
                products = productService.getAllProducts();
                break;
            case "2":
                products = productService.getAllProductByActiveStatus(true);
                break;
            case "3":
                products = productService.getAllProductByActiveStatus(false);
                break;
            default:
                return ResponseEntity.badRequest().body(ApiResponse.<List<Product>>builder()
                        .success(false)
                        .message("Invalid type. Use 1 for all, 2 for active, or 3 for inactive products.")
                        .build());
        }

        return ResponseEntity.ok(ApiResponse.<List<Product>>builder()
                .success(true)
                .message(message)
                .data(products)
                .build());
    }

    @GetMapping("/get-by-id/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.<Product>builder()
                .success(true)
                .message("Product fetched successfully")
                .data(product)
                .build());
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Product deleted successfully.")
                .build());
    }

    @GetMapping("/get-products-for-category/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER') or hasRole('NEWVISITOR')")
    public ResponseEntity<List<Product>> getProductsForCategory(@PathVariable("id") String category) {
        try {
            List<Product> products = productService.getProductsByCategory(category);
            if (products.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PutMapping("/activate-deactivate/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateActivateDeactivate(@PathVariable String id) {
        boolean updated = productService.updateActivateDeactivate(id);
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
