package com.decisionhub.controller;

import com.decisionhub.model.*;
import com.decisionhub.repository.*;
import com.decisionhub.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    @Autowired private PollRepository pollRepository;
    @Autowired private VoteRepository voteRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;

    private User getUserFromToken(String token) {
        String email = jwtUtils.getEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getAllPolls() {
        return ResponseEntity.ok(pollRepository.findByVisibility(Poll.PollVisibility.PUBLIC));
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyPolls(@RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        return ResponseEntity.ok(pollRepository.findByCreator(user));
    }

    @PostMapping
    public ResponseEntity<?> createPoll(@RequestBody Map<String, Object> body,
                                         @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);

        Poll poll = Poll.builder()
                .title((String) body.get("title"))
                .description((String) body.get("description"))
                .question((String) body.get("question"))
                .pollType(Poll.PollType.valueOf((String) body.get("pollType")))
                .visibility(Poll.PollVisibility.valueOf((String) body.get("visibility")))
                .anonymousVoting(Boolean.parseBoolean(body.getOrDefault("anonymousVoting", false).toString()))
                .creator(user)
                .build();

        Poll saved = pollRepository.save(poll);

        // Save options
        List<String> options = (List<String>) body.get("options");
        if (options != null) {
            List<PollOption> pollOptions = new ArrayList<>();
            for (String opt : options) {
                PollOption po = PollOption.builder()
                        .optionText(opt)
                        .poll(saved)
                        .build();
                pollOptions.add(po);
            }
            saved.setOptions(pollOptions);
            pollRepository.save(saved);
        }

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPoll(@PathVariable Long id) {
        return pollRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/vote")
    public ResponseEntity<?> vote(@PathVariable Long id,
                                   @RequestBody Map<String, Long> body,
                                   @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Poll poll = pollRepository.findById(id).orElseThrow();

        if (voteRepository.existsByPollAndUser(poll, user)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Already voted"));
        }

        // Find option
        Long optionId = body.get("optionId");
        PollOption option = poll.getOptions().stream()
                .filter(o -> o.getId().equals(optionId))
                .findFirst().orElseThrow();

        Vote vote = Vote.builder()
                .poll(poll)
                .option(option)
                .user(user)
                .build();

        voteRepository.save(vote);
        return ResponseEntity.ok(Map.of("message", "Vote submitted"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePoll(@PathVariable Long id,
                                         @RequestHeader("Authorization") String token) {
        User user = getUserFromToken(token);
        Poll poll = pollRepository.findById(id).orElseThrow();
        if (!poll.getCreator().getId().equals(user.getId()))
            return ResponseEntity.status(403).body(Map.of("message", "Forbidden"));
        pollRepository.delete(poll);
        return ResponseEntity.ok(Map.of("message", "Poll deleted"));
    }
}
