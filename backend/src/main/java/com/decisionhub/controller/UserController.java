package com.decisionhub.controller;

import com.decisionhub.model.User;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;

    private User getUserFromToken(String token) {
        String email = jwtUtils.getEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "fullName", user.getFullName() != null ? user.getFullName() : "",
                "bio", user.getBio() != null ? user.getBio() : "",
                "createdAt", user.getCreatedAt()
        ));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> body,
                                            @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        if (body.containsKey("fullName")) user.setFullName(body.get("fullName"));
        if (body.containsKey("bio")) user.setBio(body.get("bio"));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Profile updated"));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream().map(u -> Map.of(
                "id", u.getId(),
                "username", u.getUsername(),
                "email", u.getEmail()
        )));
    }
}
