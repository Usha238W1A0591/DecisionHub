package com.decisionhub.controller;

import com.decisionhub.model.Feedback;
import com.decisionhub.model.User;
import com.decisionhub.repository.FeedbackRepository;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired private FeedbackRepository feedbackRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;

    private User getUserFromToken(String token) {
        String email = jwtUtils.getEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email).orElseThrow();
    }

    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody Map<String, Object> body,
                                             @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Feedback feedback = Feedback.builder()
                .message((String) body.get("message"))
                .rating(body.get("rating") != null ? Integer.parseInt(body.get("rating").toString()) : null)
                .user(user)
                .build();
        feedbackRepository.save(feedback);
        return ResponseEntity.ok(Map.of("message", "Feedback submitted"));
    }

    @GetMapping
    public ResponseEntity<?> getAllFeedback(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }
}
