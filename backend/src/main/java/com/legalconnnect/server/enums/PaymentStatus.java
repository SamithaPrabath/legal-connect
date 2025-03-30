package com.legalconnnect.server.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum PaymentStatus implements ExtractableEnum {
    PAID("paid"),
    UNPAID("unpaid");

    private final String displayName;

    PaymentStatus(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String getDisplayName() {
        return this.displayName;
    }

    @JsonValue
    @Override// Serialize as lowercase in JSON responses
    public String toString() {
        return displayName;
    }

    @JsonCreator  // Deserialize from lowercase JSON values
    public static PaymentStatus fromString(String value) {
        return Arrays.stream(PaymentStatus.values())
                .filter(type -> type.displayName.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user type: " + value));
    }
}
