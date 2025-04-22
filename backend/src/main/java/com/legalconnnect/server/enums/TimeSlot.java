package com.legalconnnect.server.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum TimeSlot implements ExtractableEnum{
    EIGHT("8.00 AM"),
    NINE("9.00 AM"),
    TEN("10.00 AM"),
    ELEVEN("11.00 AM"),
    TWELVE("12.00 PM"),
    ONE("1.00 PM"),
    TWO("2.00 PM"),
    THREE("3.00 PM"),
    FOUR("4.00 PM");

    private final String timeSlot;

    TimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    @Override
    public String getDisplayName() {
        return timeSlot;
    }

    @JsonValue  // Serialize as lowercase in JSON responses
    @Override
    public String toString() {
        return timeSlot;
    }

    @JsonCreator  // Deserialize from lowercase JSON values
    public static TimeSlot fromString(String value) {
        return Arrays.stream(TimeSlot.values())
                .filter(type -> type.timeSlot.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user type: " + value));
    }
}
