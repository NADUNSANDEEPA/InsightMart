package com.chickfish.products.service;

import com.chickfish.products.components.StockComponent;
import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.dto.StockResponseDTO;
import com.chickfish.products.enums.StockStatus;
import com.chickfish.products.mapper.StockMapper;
import com.chickfish.products.model.Product;
import com.chickfish.products.model.Stock;
import com.chickfish.products.repository.ProductRepository;
import com.chickfish.products.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;
    private final ProductRepository productRepository;
    private final StockComponent stockComponent;

    @Autowired
    public StockService(StockRepository stockRepository, ProductRepository productRepository, StockComponent stockComponent) {
        this.stockRepository = stockRepository;
        this.productRepository = productRepository;
        this.stockComponent = stockComponent;
    }

    public ApiResponse createStock(Stock stock) {
        ApiResponse response = new ApiResponse();
        if (stock.getStatus() == StockStatus.ACTIVE) {
            if (stockRepository.existsByProductCode(stock.getProductCode())) {
                response.setSuccess(false);
                response.setMessage("There is an existing active stock for this product.");
                return response;
            }
        }
        stock.setCreatedAt(LocalDateTime.now());

        stockRepository.save(stock);
        response.setSuccess(true);
        response.setMessage("Stock created successfully");
        response.setData(stock);
        return response;
    }

    public List<StockResponseDTO> getAllStocks() {

        List<StockResponseDTO> result = new ArrayList<>();
        List<Product> products = productRepository.findAll();

        for (Product product : products) {

            String productCode = product.getProductCode();
            String productName = product.getProductName();

            List<Stock> activeStocks =
                    stockRepository.findActiveOrPendingByProductCode(productCode);

            if (!activeStocks.isEmpty()) {
                for (Stock stock : activeStocks) {
                    result.add(StockMapper.mapToDTO(stock, productName));
                }
            } else {
                stockRepository.findLastAddedByProductCode(productCode)
                        .ifPresent(stock ->
                                result.add(StockMapper.mapToDTO(stock, productName))
                        );
            }
        }

        return result;
    }


    public Stock getStockById(String id) {
        return stockRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Stock not found"));
    }

    public Stock updateStock(String id, Stock updatedStock) {
        Stock existing = getStockById(id);

        existing.setProductCode(updatedStock.getProductCode());
        existing.setReceivedStockKg(updatedStock.getReceivedStockKg());
        existing.setAvailableStockKg(updatedStock.getAvailableStockKg());
        existing.setPricePerKg(updatedStock.getPricePerKg());
        existing.setDiscount(updatedStock.getDiscount());

        return stockRepository.save(existing);
    }

    public void deleteStock(String id) {
        if (!stockRepository.existsById(id)) {
            throw new IllegalStateException("Stock not found");
        }
        stockRepository.deleteById(id);
    }

    public ApiResponse getStocksByProductCode(String productCode) {
        ApiResponse response = null;
        try {
            response = stockComponent.getStocksByProductCode(productCode,"");
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Failed to fetch stocks: " + e.getMessage());
            response.setData(null);
            e.printStackTrace();
        }
        return response;
    }

}
