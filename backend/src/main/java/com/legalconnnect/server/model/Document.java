package com.legalconnnect.server.model;

import com.legalconnnect.server.enums.UserType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private UserType userType;
    private String fileName;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] file;

    @ManyToOne(fetch = FetchType.LAZY)
    private Case aCase;
}
