package com.decisionhub.controller;

import com.decisionhub.dto.AuthRequest;
import com.decisionhub.dto.RegisterRequest;
import com.decisionhub.model.User;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            return ResponseEntity.badRequest().body(Map.of("message", "Email already in use"));
        if (userRepository.existsByUsername(req.getUsername()))
            return ResponseEntity.badRequest().body(Map.of("message", "Username already taken"));

        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .fullName(req.getFullName())
                .build();

        userRepository.save(user);
        String token = jwtUtils.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "message", "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));

            String token = jwtUtils.generateToken(req.getEmail());
            User user = userRepository.findByEmail(req.getEmail()).orElseThrow();

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "userId", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "fullName", user.getFullName() != null ? user.getFullName() : ""
            ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
    }
}
