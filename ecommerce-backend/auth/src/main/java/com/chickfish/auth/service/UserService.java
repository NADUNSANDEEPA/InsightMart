package com.chickfish.auth.service;

import com.chickfish.auth.dto.*;
import com.chickfish.auth.entity.TokenInitialize;
import com.chickfish.auth.entity.User;
import com.chickfish.auth.enums.UserRoles;
import com.chickfish.auth.repository.TokenInitializeRepository;
import com.chickfish.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenInitializeRepository tokenInitializeRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService, TokenInitializeRepository tokenInitializeRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.tokenInitializeRepository = tokenInitializeRepository;
    }


    /**
     * Register a new user
     */
    public String register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return user.getUsername();
    }

    /**
     * Login user and return JWT token
     *
     */
    public AuthResponse login(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            User user = (User) authentication.getPrincipal();

            String token = jwtService.generateToken(user.getUsername(), user.getRole());

            return AuthResponse.builder()
                    .token(token)
                    .username(user.getUsername())
                    .build();

        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid credentials");
        }
    }


    /**
     * Validate JWT token and return username
     */
    public String validateToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String username = jwtService.extractUsername(token);

        if (jwtService.isTokenValid(token, username)) {
            return username;
        } else {
            throw new RuntimeException("Invalid token");
        }
    }

    public AuthResponse visitorReg(TokenInitializeRequest request) {

        Optional<TokenInitialize> existingToken =
                tokenInitializeRepository.findByMacAddress(
                        request.getMacAddress()
                );

        if (existingToken.isPresent()) {
            TokenInitialize tokenData = existingToken.get();

            return AuthResponse.builder()
                    .token(tokenData.getToken())
                    .username(tokenData.getMacAddress())
                    .build();
        }

        String jwtToken = jwtService.generateToken(
                request.getMacAddress(),
                UserRoles.NEWVISITOR
        );

        TokenInitialize newToken = TokenInitialize.builder()
                .id(UUID.randomUUID().toString())
                .macAddress(request.getMacAddress())
                .ipAddress(request.getIpAddress())
                .token(jwtToken)
                .timestamp(LocalDateTime.now().toString())
                .build();

        tokenInitializeRepository.save(newToken);

        return AuthResponse.builder()
                .token(jwtToken)
                .username(request.getMacAddress())
                .build();
    }
}