package com.decisionhub.repository;

import com.decisionhub.model.Poll;
import com.decisionhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PollRepository extends JpaRepository<Poll, Long> {
    List<Poll> findByCreator(User creator);
    List<Poll> findByVisibility(Poll.PollVisibility visibility);
    List<Poll> findByActive(boolean active);
    long countByActive(boolean active);
}
