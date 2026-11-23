package com.decisionhub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "polls")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private String question;

    @Enumerated(EnumType.STRING)
    private PollType pollType;

    @Enumerated(EnumType.STRING)
    private PollVisibility visibility;

    private boolean anonymousVoting;
    private boolean active;

    private LocalDateTime expiresAt;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PollOption> options;

    @JsonIgnore
    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vote> votes;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        active = true;
    }

    public enum PollType {
        SINGLE_CHOICE, MULTIPLE_CHOICE, RATING
    }

    public enum PollVisibility {
        PUBLIC, PRIVATE
    }
}
