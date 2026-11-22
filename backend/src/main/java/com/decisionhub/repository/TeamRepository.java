package com.decisionhub.repository;

import com.decisionhub.model.Team;
import com.decisionhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByCreator(User creator);
    List<Team> findByMembersContaining(User user);
}
