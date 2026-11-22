package com.decisionhub.controller;

import com.decisionhub.model.Team;
import com.decisionhub.model.User;
import com.decisionhub.repository.TeamRepository;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired private TeamRepository teamRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;

    private User getUserFromToken(String token) {
        String email = jwtUtils.getEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getAllTeams() {
        return ResponseEntity.ok(teamRepository.findAll());
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyTeams(@RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        return ResponseEntity.ok(teamRepository.findByCreator(user));
    }

    @PostMapping
    public ResponseEntity<?> createTeam(@RequestBody Map<String, String> body,
                                         @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Team team = Team.builder()
                .name(body.get("name"))
                .description(body.get("description"))
                .creator(user)
                .members(new ArrayList<>(List.of(user)))
                .build();
        teamRepository.save(team);
        return ResponseEntity.ok(team);
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<?> joinTeam(@PathVariable Long id,
                                       @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Team team = teamRepository.findById(id).orElseThrow();
        if (!team.getMembers().contains(user)) {
            team.getMembers().add(user);
            teamRepository.save(team);
        }
        return ResponseEntity.ok(Map.of("message", "Joined team"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long id,
                                         @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Team team = teamRepository.findById(id).orElseThrow();
        if (!team.getCreator().getId().equals(user.getId()))
            return ResponseEntity.status(403).body(Map.of("message", "Forbidden"));
        teamRepository.delete(team);
        return ResponseEntity.ok(Map.of("message", "Team deleted"));
    }
}
