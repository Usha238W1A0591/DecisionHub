package com.decisionhub.controller;

import com.decisionhub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired private UserRepository userRepository;
    @Autowired private PollRepository pollRepository;
    @Autowired private VoteRepository voteRepository;
    @Autowired private TeamRepository teamRepository;
    @Autowired private CommunityRepository communityRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalPolls = pollRepository.count();
        long totalVotes = voteRepository.countTotalVotes();
        long totalTeams = teamRepository.count();
        long totalCommunities = communityRepository.count();
        long activePolls = pollRepository.countByActive(true);
        long inactivePolls = pollRepository.countByActive(false);

        return ResponseEntity.ok(Map.of(
                "totalUsers", totalUsers,
                "totalPolls", totalPolls,
                "totalVotes", totalVotes,
                "totalTeams", totalTeams,
                "totalCommunities", totalCommunities,
                "activePolls", activePolls,
                "inactivePolls", inactivePolls
        ));
    }
}
