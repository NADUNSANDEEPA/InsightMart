package com.chickfish.products.service;

import com.chickfish.products.dto.AdminDasboardResponse;
import com.chickfish.products.dto.ProductStockResponseDTO;
import com.chickfish.products.enums.StockStatus;
import com.chickfish.products.model.Product;
import com.chickfish.products.model.ProductCategory;
import com.chickfish.products.model.Stock;
import com.chickfish.products.repository.ProductCategoryRepository;
import com.chickfish.products.repository.ProductRepository;
import com.chickfish.products.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final StockRepository stockRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, StockRepository stockRepository, ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.stockRepository = stockRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

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
        return productRepository.findByProductCategoryId(categoryId);
    }

    public boolean updateActivateDeactivate(String id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            return false;
        }
        Product product = optionalProduct.get();
        product.setActive(!product.isActive());

        productRepository.save(product);
        return true;
    }

    public List<Product> getAllProductByActiveStatus(boolean activeStatus) {
        return productRepository.findAll()
                .stream()
                .filter(product -> product.isActive() == activeStatus)
                .collect(Collectors.toList());
    }

    public List<ProductStockResponseDTO> getProductForShowForCustomer(String categoryId) {

        List<Product> products =
                productRepository.findActiveProductsByCategoryId(categoryId);

        List<ProductStockResponseDTO> response = new ArrayList<>();

        for (Product product : products) {

            Optional<Stock> stockOpt =
                    stockRepository.findFirstByProductCodeAndStatusOrderByCreatedAtDesc(
                            product.getProductCode(),
                            StockStatus.ACTIVE
                    );

            // DEFAULT: Out of stock
            ProductStockResponseDTO.ProductStockResponseDTOBuilder builder =
                    ProductStockResponseDTO.builder()
                            .productCode(product.getProductCode())
                            .productName(product.getProductName())
                            .productDescription(product.getProductDescription())
                            .imageUrl(product.getImageUrl())
                            .categoryId(product.getProductCategory().getId())
                            .active(product.isActive())
                            .outOfStock(true)
                            .stockMessage("Out of stock");

            if (stockOpt.isPresent()) {
                Stock stock = stockOpt.get();

                builder
                        .stockId(stock.getId())
                        .receivedStockKg(stock.getReceivedStockKg())
                        .availableStockKg(stock.getAvailableStockKg())
                        .pricePerKg(stock.getPricePerKg())
                        .discount(stock.getDiscount())
                        .discountEligibleWeight(stock.getDiscountEligibleWeight())
                        .stockStatus(stock.getStatus().name());

                if (stock.getAvailableStockKg() > 0) {
                    builder
                            .outOfStock(false)
                            .stockMessage("In stock");
                }
            }

            response.add(builder.build());
        }

        return response;
    }

    public AdminDasboardResponse getSummeryForDashboard() {
        AdminDasboardResponse adminDasboardResponse = new AdminDasboardResponse();

        List<ProductCategory> meatProductCategories = productCategoryRepository.findByCategoryName("Meat");
        List<ProductCategory> seaFoodsProductCategories = productCategoryRepository.findByCategoryName("Sea Foods");

        int meatProductCount = 0;
        int fishProductCount = 0;

        if (meatProductCategories != null && !meatProductCategories.isEmpty()) {
            for (ProductCategory category : meatProductCategories) {
                if (category.getId() != null) {
                    List<Product> productsList = productRepository.findByProductCategoryId(category.getId());
                    meatProductCount = meatProductCount + productsList.size();
                }
            }
        }

        if (seaFoodsProductCategories != null && !seaFoodsProductCategories.isEmpty()) {
            for (ProductCategory category : seaFoodsProductCategories) {
                if (category.getId() != null) {
                    List<Product> productsList = productRepository.findByProductCategoryId(category.getId());
                    fishProductCount = fishProductCount + productsList.size();
                }
            }
        }

        adminDasboardResponse.setMeatProductCount(meatProductCount);
        adminDasboardResponse.setFishProductCount(fishProductCount);

        return adminDasboardResponse;
    }
}
