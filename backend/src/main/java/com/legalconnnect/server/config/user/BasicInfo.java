package com.legalconnnect.server.config.user;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class BasicInfo {
    @Lob
    private String image;
    private String firstName;
    private String lastName;
    private String occupation;
    private String language;
    private String location;
    private String city;
}
