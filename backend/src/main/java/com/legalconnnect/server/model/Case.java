package com.legalconnnect.server.model;

import com.legalconnnect.server.config.cases.Court;
import com.legalconnnect.server.config.cases.OppositionParty;
import com.legalconnnect.server.enums.CaseStatus;
import com.legalconnnect.server.enums.CaseType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "cases")
public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String caseNumber;
    private String caseName;
    private CaseType caseType;
    private String caseStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo client;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserInfo lawyer;

    @AttributeOverrides({
            @AttributeOverride(name="name", column = @Column(name = "opposition_party_name")),
            @AttributeOverride(name ="phone", column = @Column(name = "opposition_party_phone")),
            @AttributeOverride(name ="lawyerName", column = @Column(name = "opposition_party_lawyer_name"))
    })
    @Embedded
    private OppositionParty oppositionParty;

    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "court_name")),
            @AttributeOverride(name = "phone", column = @Column(name = "court_phone")),
            @AttributeOverride(name = "address", column = @Column(name = "court_address")),
    })
    @Embedded
    private Court court;

    private Date createdDate;
    private Date deadline;
}
