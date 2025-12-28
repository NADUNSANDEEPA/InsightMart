package com.chickfish.products.controller;

import com.chickfish.products.dto.*;
import com.chickfish.products.model.Product;
import com.chickfish.products.service.PredictionService;
import com.chickfish.products.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final PredictionService predictionService;

    @Autowired
    public ProductController(ProductService productService, PredictionService predictionService) {
        this.productService = productService;
        this.predictionService = predictionService;
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
        log.info("Fetching products by type: {}", type);
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

    @GetMapping("/get-product-for-show-customers/{productCategoryId}")
    public ResponseEntity<ApiResponse<List<ProductStockResponseDTO>>> getProductForShowForCustomer(
            @PathVariable String productCategoryId
    ) {
        List<ProductStockResponseDTO> products = productService.getProductForShowForCustomer(productCategoryId);
        return ResponseEntity.ok(
                ApiResponse.<List<ProductStockResponseDTO>>builder()
                        .success(true)
                        .message("Product fetched successfully")
                        .data(products)
                        .build()
        );
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

    @PostMapping("/predict")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<ProductPredictionResponseDto>> predictProduct(
            @RequestBody PredictProductsDto predictProductsDto) {

        log.info("Call for Predict Products.");
        ProductPredictionResponseDto prediction = predictionService.getPrediction(predictProductsDto);

        ApiResponse<ProductPredictionResponseDto> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Product prediction generated successfully");
        response.setData(prediction);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin-dashboard/load-products-counts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> getCountForDashboard() {
        ApiResponse apiResponse = new ApiResponse();
        AdminDasboardResponse dasboardResponse = productService.getSummeryForDashboard();

        apiResponse.setSuccess(true);
        apiResponse.setMessage("Data was loaded");
        apiResponse.setData(dasboardResponse);
        return ResponseEntity.ok(apiResponse);
    }
}
