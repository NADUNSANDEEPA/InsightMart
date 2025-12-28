package com.chickfish.products.controller;

import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.dto.StockResponseDTO;
import com.chickfish.products.model.Stock;
import com.chickfish.products.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @PostMapping("/add-stock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createStock(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.createStock(stock));
    }

    @GetMapping("/get-all-stocks")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<List<StockResponseDTO>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<Stock> getStockById(@PathVariable String id) {
        return ResponseEntity.ok(stockService.getStockById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<Stock> updateStock(
            @PathVariable String id,
            @RequestBody Stock stock
    ) {
        return ResponseEntity.ok(stockService.updateStock(id, stock));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<String> deleteStock(@PathVariable String id) {
        stockService.deleteStock(id);
        return ResponseEntity.ok("Stock deleted successfully");
    }

    @GetMapping("/get-by-product-code/{productCode}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse> getStocksByProductCode(@PathVariable String productCode) {
        return ResponseEntity.ok(stockService.getStocksByProductCode(productCode));
    }

}
