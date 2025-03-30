package com.legalconnnect.server.model;

import com.legalconnnect.server.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String invoiceId;
    private String name;
    private Double amount;
    private String dueDate;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo client;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo lawyer;

}
