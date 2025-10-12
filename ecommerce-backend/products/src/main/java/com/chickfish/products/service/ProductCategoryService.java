package com.chickfish.products.service;

import com.chickfish.products.exceptions.ResourceNotFoundException;
import com.chickfish.products.model.Product;
import com.chickfish.products.model.ProductCategory;
import com.chickfish.products.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public ProductCategory createProductCategory(ProductCategory category) {
        return productCategoryRepository.save(category);
    }

    public List<ProductCategory> getAll() {
        return productCategoryRepository.findAll();
    }

    public ProductCategory getById(String id) {
        return productCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProductCategory not found with id: " + id));
    }

    public ProductCategory update(String id, ProductCategory category) {
        ProductCategory existing = getById(id);
        existing.setCategoryName(category.getCategoryName());
        existing.setSubCategoryName(category.getSubCategoryName());
        existing.setDescription(category.getDescription());
        return productCategoryRepository.save(existing);
    }

    public void delete(String id) {
        ProductCategory existing = getById(id);
        productCategoryRepository.delete(existing);
    }

    public boolean updateActivateDeactivate(String id) {
        Optional<ProductCategory> optionalProductCategory = productCategoryRepository.findById(id);
        if (optionalProductCategory.isEmpty()) {
            return false;
        }
        ProductCategory productCategory = optionalProductCategory.get();
        productCategory.setActive(!productCategory.isActive());

        productCategoryRepository.save(productCategory);
        return true;
    }

    public List<ProductCategory> getProductByActiveStatus(boolean activeStatus) {
        return productCategoryRepository.findAll()
                .stream()
                .filter(product -> product.isActive() == activeStatus)
                .collect(Collectors.toList());
    }
}