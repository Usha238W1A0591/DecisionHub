package com.decisionhub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "option_comparisons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OptionComparison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    // Option A
    private String optionAName;
    private String optionAPros;
    private String optionACons;
    private String optionACost;
    private String optionARisk;

    // Option B
    private String optionBName;
    private String optionBPros;
    private String optionBCons;
    private String optionBCost;
    private String optionBRisk;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
