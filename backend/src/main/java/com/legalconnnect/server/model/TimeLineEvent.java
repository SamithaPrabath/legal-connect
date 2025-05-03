package com.legalconnnect.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TimeLineEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String description;
    private LocalDateTime date;
    @ManyToOne
    private Case aCase;

    public TimeLineEvent(String description, Case aCase) {
        this.date = LocalDateTime.now(ZoneId.of("Asia/Colombo"));
        this.description = description;
        this.aCase = aCase;
    }
}
