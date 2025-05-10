package com.legalconnnect.server.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Arrays;

public enum UserType {
    LAWYER("lawyer"),
    CLIENT("client"),
    ADMIN("admin");

    private final String userType;

    UserType(String userType) {
        this.userType = userType.toUpperCase();
    }

    @JsonValue  // Serialize as lowercase in JSON responses
    public String getUserType() {
        return this.userType;
    }

    @JsonCreator  // Deserialize from lowercase JSON values
    public static UserType fromString(String value) {
        return Arrays.stream(UserType.values())
                .filter(type -> type.userType.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user type: " + value));
    }

}
