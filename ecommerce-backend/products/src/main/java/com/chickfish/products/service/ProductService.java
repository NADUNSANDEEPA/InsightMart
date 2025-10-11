package com.chickfish.products.service;

import com.chickfish.products.model.Product;
import com.chickfish.products.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Product updateProduct(String id, Product product) {
        Product existing = getProductById(id);

        existing.setProductName(product.getProductName());
        existing.setProductDescription(product.getProductDescription());
        existing.setCurrentPrice(product.getCurrentPrice());
        existing.setCurrentStock(product.getCurrentStock());
        existing.setProductCategory(product.getProductCategory());

        return productRepository.save(existing);
    }

    public void deleteProduct(String id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
    }

    public List<Product> getProductsByCategory(String categoryId) {
        if (categoryId == null || categoryId.isEmpty()) {
            return Collections.emptyList();
        }
        return productRepository.findByProductCategory_Id(categoryId);
    }
}
