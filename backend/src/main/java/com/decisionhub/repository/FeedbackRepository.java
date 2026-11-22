package com.decisionhub.repository;

import com.decisionhub.model.Feedback;
import com.decisionhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUser(User user);
}
