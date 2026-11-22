package com.decisionhub.repository;

import com.decisionhub.model.Poll;
import com.decisionhub.model.User;
import com.decisionhub.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote> findByPoll(Poll poll);
    boolean existsByPollAndUser(Poll poll, User user);
    long countByPoll(Poll poll);

    @Query("SELECT COUNT(v) FROM Vote v")
    long countTotalVotes();
}
