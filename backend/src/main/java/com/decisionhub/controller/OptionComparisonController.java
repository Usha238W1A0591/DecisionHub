package com.decisionhub.controller;

import com.decisionhub.model.OptionComparison;
import com.decisionhub.model.User;
import com.decisionhub.repository.OptionComparisonRepository;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/comparisons")
public class OptionComparisonController {

    @Autowired private OptionComparisonRepository comparisonRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;

    private User getUserFromToken(String token) {
        String email = jwtUtils.getEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        return ResponseEntity.ok(comparisonRepository.findByCreator(user));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, String> body,
                                     @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        OptionComparison oc = OptionComparison.builder()
                .title(body.get("title"))
                .description(body.get("description"))
                .optionAName(body.get("optionAName"))
                .optionAPros(body.get("optionAPros"))
                .optionACons(body.get("optionACons"))
                .optionACost(body.get("optionACost"))
                .optionARisk(body.get("optionARisk"))
                .optionBName(body.get("optionBName"))
                .optionBPros(body.get("optionBPros"))
                .optionBCons(body.get("optionBCons"))
                .optionBCost(body.get("optionBCost"))
                .optionBRisk(body.get("optionBRisk"))
                .creator(user)
                .build();
        comparisonRepository.save(oc);
        return ResponseEntity.ok(oc);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,
                                     @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        OptionComparison oc = comparisonRepository.findById(id).orElseThrow();
        if (!oc.getCreator().getId().equals(user.getId()))
            return ResponseEntity.status(403).body(Map.of("message", "Forbidden"));
        comparisonRepository.delete(oc);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
