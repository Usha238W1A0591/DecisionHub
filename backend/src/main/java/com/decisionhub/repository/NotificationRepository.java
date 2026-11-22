package com.decisionhub.repository;

import com.decisionhub.model.Notification;
import com.decisionhub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    List<Notification> findByUserAndRead(User user, boolean read);
}
