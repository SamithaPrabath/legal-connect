package com.legalconnnect.server.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum SortOptionEnum {
    BEST_MATCH("Best Match");

    private final String sortOption;

    SortOptionEnum(String sortOption) {
        this.sortOption = sortOption;
    }

    @JsonValue  // Serialize as lowercase in JSON responses
    @Override
    public String toString() {
        return sortOption;
    }

    @JsonCreator  // Deserialize from lowercase JSON values
    public static SortOptionEnum fromString(String value) {
        return Arrays.stream(SortOptionEnum.values())
                .filter(type -> type.sortOption.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user type: " + value));
    }
}
