package com.legalconnnect.server.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum UserStatus {
    AVAILABLE("Available for Consultation"),
    UNAVAILABLE("Unavailable");

    private final String userStatus;

    UserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    @JsonValue
    @Override// Serialize as lowercase in JSON responses
    public String toString() {
        return userStatus;
    }

    @JsonCreator  // Deserialize from lowercase JSON values
    public static UserStatus fromString(String value) {
        return Arrays.stream(UserStatus.values())
                .filter(type -> type.userStatus.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user type: " + value));
    }
}
