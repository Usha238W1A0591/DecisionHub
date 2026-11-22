package com.decisionhub.repository;

import com.decisionhub.model.OptionComparison;
import com.decisionhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OptionComparisonRepository extends JpaRepository<OptionComparison, Long> {
    List<OptionComparison> findByCreator(User creator);
}
