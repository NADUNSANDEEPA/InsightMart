package com.chickfish.products.components;

import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.model.Product;
import com.chickfish.products.model.Stock;
import com.chickfish.products.repository.ProductRepository;
import com.chickfish.products.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class StockComponent {
    private final StockRepository stockRepository;
    private final ProductRepository productRepository;

    @Autowired
    public StockComponent(StockRepository stockRepository, ProductRepository productRepository) {
        this.stockRepository = stockRepository;
        this.productRepository = productRepository;
    }

    public ApiResponse getStocksByProductCode(String productCode, String productName) {
        ApiResponse response = new ApiResponse();

        Product product = null;
        if (!Objects.equals(productName, "")){
            product = productRepository.findByProductName(productName);
        } else {
            product = productRepository.findById(productCode).orElseThrow(() -> new IllegalStateException("Product not found with code " + productCode));
        }
        if (product == null) {
            response.setSuccess(false);
            response.setMessage("There are no products with the given product code");
            return response;
        }

        if (!product.isActive()) {
            response.setSuccess(false);
            response.setMessage("The product with the given product code is not active");
            return response;
        }

        List<Stock> stockResponse = stockRepository.findActiveProduct(product.getProductCode());
        response.setSuccess(true);
        response.setMessage("Stocks fetched successfully");
        response.setData(stockResponse);
        return response;
    }
}
