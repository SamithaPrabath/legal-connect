package com.legalconnnect.server.model;

import com.legalconnnect.server.enums.TimeSlot;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private LocalDate date;
    private String time;

    @ManyToOne(fetch = FetchType.LAZY)
    private Case aCase;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo lawyer;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo client;
}
