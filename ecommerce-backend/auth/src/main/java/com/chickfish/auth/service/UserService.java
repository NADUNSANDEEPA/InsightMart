package com.chickfish.auth.service;

import com.chickfish.auth.dto.*;
import com.chickfish.auth.entity.User;
import com.chickfish.auth.enums.UserRoles;
import com.chickfish.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
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
    * */
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

        String rawPassword = UUID.randomUUID().toString();

        User user = User.builder()
                .username(request.getMacAddress())
                .password(passwordEncoder.encode(rawPassword))
                .role(UserRoles.NEWVISITOR)
                .build();

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getMacAddress(), rawPassword)
        );

        User authUser = (User) authentication.getPrincipal();

        String token = jwtService.generateToken(authUser.getUsername(), authUser.getRole());

        return AuthResponse.builder()
                .token(token)
                .username(authUser.getUsername())
                .build();
    }
}