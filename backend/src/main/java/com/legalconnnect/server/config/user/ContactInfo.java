package com.legalconnnect.server.config.user;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class ContactInfo {
    @Column(unique = true)
    private String email;
    private String phone;
    private String address;
}
