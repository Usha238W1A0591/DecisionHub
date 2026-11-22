package com.decisionhub.controller;

import com.decisionhub.model.Community;
import com.decisionhub.model.User;
import com.decisionhub.repository.CommunityRepository;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {

    @Autowired private CommunityRepository communityRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;

    private User getUserFromToken(String token) {
        String email = jwtUtils.getEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getAllCommunities() {
        return ResponseEntity.ok(communityRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createCommunity(@RequestBody Map<String, String> body,
                                               @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Community community = Community.builder()
                .name(body.get("name"))
                .description(body.get("description"))
                .creator(user)
                .members(new ArrayList<>(List.of(user)))
                .build();
        communityRepository.save(community);
        return ResponseEntity.ok(community);
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<?> joinCommunity(@PathVariable Long id,
                                            @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Community community = communityRepository.findById(id).orElseThrow();
        if (!community.getMembers().contains(user)) {
            community.getMembers().add(user);
            communityRepository.save(community);
        }
        return ResponseEntity.ok(Map.of("message", "Joined community"));
    }
}
