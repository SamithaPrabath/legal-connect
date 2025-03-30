package com.legalconnnect.server.config.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@Embeddable
public class AboutInfo {
    private String bio;
    private String credentialsAndEducation;
    private String workHistory;

    @ElementCollection
    @CollectionTable(name = "user_practice_areas", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "practiceAreas")
    private Set<String> practiceAreas;
}
