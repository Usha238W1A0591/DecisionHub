package com.decisionhub.repository;

import com.decisionhub.model.Community;
import com.decisionhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByCreator(User creator);
    List<Community> findByMembersContaining(User user);
}
