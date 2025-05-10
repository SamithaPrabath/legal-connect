package com.legalconnnect.server.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum LawyerStatus {
    PENDING("Pending"),
    VERIFIED("Verified"),
    DENIED("Denied");

    private final String lawyerStatus;

    LawyerStatus(String lawyerStatus) {
        this.lawyerStatus = lawyerStatus;
    }

    @JsonValue  // Serialize as lowercase in JSON responses
    @Override
    public String toString() {
        return lawyerStatus;
    }

    @JsonCreator  // Deserialize from lowercase JSON values
    public static LawyerStatus fromString(String value) {
        return Arrays.stream(LawyerStatus.values())
                .filter(type -> type.lawyerStatus.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid lawyer status: " + value));
    }
}
