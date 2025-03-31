package com.legalconnnect.server.model;

import com.legalconnnect.server.config.user.AboutInfo;
import com.legalconnnect.server.config.user.BasicInfo;
import com.legalconnnect.server.config.user.ContactInfo;
import com.legalconnnect.server.enums.LawyerStatus;
import com.legalconnnect.server.enums.UserStatus;
import com.legalconnnect.server.enums.UserType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(EnumType.STRING)
    private UserType type;

    @AttributeOverrides({
            @AttributeOverride(name = "image", column = @Column(name = "image", columnDefinition = "LONGBLOB")),
            @AttributeOverride(name ="firstName", column = @Column(name = "firstName")),
            @AttributeOverride(name ="lastName", column = @Column(name = "lastName")),
            @AttributeOverride(name ="occupation", column = @Column(name = "occupation")),
            @AttributeOverride(name ="language", column = @Column(name = "language")),
            @AttributeOverride(name ="location", column = @Column(name = "location")),
            @AttributeOverride(name ="city", column = @Column(name = "city")),
    })
    @Embedded
    private BasicInfo basicInfo;

    @AttributeOverrides({
            @AttributeOverride(name ="email", column = @Column(name ="email")),
            @AttributeOverride(name ="phone", column = @Column(name ="phone")),
            @AttributeOverride(name ="address", column = @Column(name ="address")),
    })
    @Embedded
    private ContactInfo contactInfo;
    private String password;

    // following parameters
    @AttributeOverrides({
            @AttributeOverride(name = "bio", column = @Column(name = "bio")),
            @AttributeOverride(name = "credentialsAndEducation", column = @Column(name = "credentialsAndEducation")),
            @AttributeOverride(name = "workHistory", column = @Column(name = "workHistory"))
    })
    @Embedded
    private AboutInfo aboutInfo;

    @Enumerated(EnumType.STRING)
    private LawyerStatus lawyerStatus;
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    private Integer reviewCount;
    private Double rating;
}
