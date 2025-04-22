package com.legalconnnect.server.config.cases;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class Court {
    private String name;
    private String phone;
    private String address;
}
