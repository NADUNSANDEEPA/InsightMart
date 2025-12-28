package com.chickfish.products.service;

import com.chickfish.products.components.StockComponent;
import com.chickfish.products.dto.AdminDasboardResponse;
import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.dto.PredictProductsDto;
import com.chickfish.products.dto.ProductPredictionResponseDto;
import com.chickfish.products.model.Product;
import com.chickfish.products.model.Stock;
import com.chickfish.products.repository.ProductRepository;
import com.chickfish.products.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PredictionService {

    private final RestTemplate restTemplate;
    private final ProductRepository productRepository;
    private final StockRepository stockRepository;
    private final StockComponent stockComponent;

    @Value("${product.predict.api.url}")
    private String predictApiUrl;

    @Autowired
    public PredictionService(ProductRepository productRepository, StockRepository stockRepository, StockComponent stockComponent) {
        this.restTemplate = new RestTemplate();
        this.productRepository = productRepository;
        this.stockRepository = stockRepository;
        this.stockComponent = stockComponent;
    }

    public ProductPredictionResponseDto getPrediction(PredictProductsDto predictProductsDto) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PredictProductsDto> request = new HttpEntity<>(predictProductsDto, headers);

        ProductPredictionResponseDto response = restTemplate.postForObject(
                predictApiUrl,
                request,
                ProductPredictionResponseDto.class
        );

        if (response != null && response.getRecommendations() != null) {
            for (ProductPredictionResponseDto.Recommendation productItem : response.getRecommendations()) {
                String productName = productItem.getProductName();

                List<Product> products = productRepository.findAll();
                for (Product product : products) {
                    if (product.getProductName().equalsIgnoreCase(productName)) {
                        productItem.setImageUrl(product.getImageUrl());

                        try {
                            ApiResponse stockResponse = stockComponent.getStocksByProductCode("", productName);
                            if (stockResponse != null && stockResponse.getData() != null) {
                                List<Stock> stock = (List<Stock>) stockResponse.getData();
                                productItem.setStock(stock.get(0));
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            productItem.setStock(null);
                        }

                        break;
                    }
                }
            }
        }

        return response;
    }
}
