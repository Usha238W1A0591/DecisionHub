package com.decisionhub.controller;

import com.decisionhub.model.Notification;
import com.decisionhub.model.User;
import com.decisionhub.repository.NotificationRepository;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired private NotificationRepository notificationRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;

    private User getUserFromToken(String token) {
        String email = jwtUtils.getEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getNotifications(@RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        return ResponseEntity.ok(notificationRepository.findByUserOrderByCreatedAtDesc(user));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable Long id,
                                       @RequestHeader("Authorization") String token) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        n.setRead(true);
        notificationRepository.save(n);
        return ResponseEntity.ok(Map.of("message", "Marked as read"));
    }
}
