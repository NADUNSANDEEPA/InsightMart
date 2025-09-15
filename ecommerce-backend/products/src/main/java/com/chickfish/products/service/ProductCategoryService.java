package com.chickfish.products.service;

import com.chickfish.products.exceptions.ResourceNotFoundException;
import com.chickfish.products.model.ProductCategory;
import com.chickfish.products.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {

    private final ProductCategoryRepository repository;

    public ProductCategory createProductCategory(ProductCategory category) {
        
        return repository.save(category);
    }

    public List<ProductCategory> getAll() {
        return repository.findAll();
    }

    public ProductCategory getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProductCategory not found with id: " + id));
    }

    public ProductCategory update(String id, ProductCategory category) {
        ProductCategory existing = getById(id);
        existing.setCategoryName(category.getCategoryName());
        existing.setSubCategoryName(category.getSubCategoryName());
        existing.setDescription(category.getDescription());
        return repository.save(existing);
    }

    public void delete(String id) {
        ProductCategory existing = getById(id);
        repository.delete(existing);
    }
}