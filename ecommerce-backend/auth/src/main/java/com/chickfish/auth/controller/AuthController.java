package com.chickfish.products.controller;

import com.chickfish.products.dto.ApiResponse;
import com.chickfish.products.dto.AuthRequest;
import com.chickfish.products.dto.AuthResponse;
import com.chickfish.products.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            String token = jwtService.generateToken(request.getUsername());

            AuthResponse authResponse = AuthResponse.builder()
                    .token(token)
                    .username(request.getUsername())
                    .build();

            return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                    .success(true)
                    .message("Login successful")
                    .data(authResponse)
                    .build());

        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body(ApiResponse.<AuthResponse>builder()
                    .success(false)
                    .message("Invalid credentials")
                    .data(null)
                    .build());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<String>> validateToken(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String username = jwtService.extractUsername(token);

            if (jwtService.isTokenValid(token, username)) {
                return ResponseEntity.ok(ApiResponse.<String>builder()
                        .success(true)
                        .message("Token is valid")
                        .data(username)
                        .build());
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                        .success(false)
                        .message("Invalid token")
                        .data(null)
                        .build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Invalid token format")
                    .data(null)
                    .build());
        }
    }
}