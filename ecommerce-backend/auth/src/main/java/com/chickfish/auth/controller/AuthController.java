package com.chickfish.auth.controller;

import com.chickfish.auth.dto.*;
import com.chickfish.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/visitor-reg")
    public ResponseEntity<?> visitorReg(@RequestBody TokenInitializeRequest request) {
        try {
            AuthResponse response = userService.visitorReg(request);

            return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                    .success(true)
                    .message("Visitor registered successfully")
                    .data(response)
                    .build());

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody RegisterRequest request) {
        try {
            String username = userService.register(request);
            return ResponseEntity.ok(ApiResponse.<String>builder()
                    .success(true)
                    .message("User registered successfully")
                    .data(username)
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse authResponse = userService.login(request);
            return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                    .success(true)
                    .message("Login successful")
                    .data(authResponse)
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.<AuthResponse>builder()
                    .success(false)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<String>> validateToken(@RequestHeader("Authorization") String token) {
        try {
            String username = userService.validateToken(token);
            return ResponseEntity.ok(ApiResponse.<String>builder()
                    .success(true)
                    .message("Token is valid")
                    .data(username)
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message(e.getMessage())
                    .data(null)
                    .build());
        }
    }
}
