package com.legalconnnect.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String note;
    private String date;
    private String time;

    @ManyToOne(fetch = FetchType.LAZY)
    private Case aCase;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo user;
}
