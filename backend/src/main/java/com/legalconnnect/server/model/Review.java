package com.legalconnnect.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String date;
    private Integer rating;
    private String title;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo client;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo lawyer;
}
