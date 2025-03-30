package com.legalconnnect.server.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum CaseStatus {
    IN_PROGRESS("in progress"),
    ON_HOLD("on hold"),
    AWAIT_HEARING("await hearing"),
    CLOSED("closed");

    private final String caseStatus;

    CaseStatus(String caseStatus) {
        this.caseStatus = caseStatus;
    }

    @JsonValue  // Serialize as lowercase in JSON responses
    @Override
    public String toString() {
        return caseStatus;
    }

    @JsonCreator  // Deserialize from lowercase JSON values
    public static CaseStatus fromString(String value) {
        return Arrays.stream(CaseStatus.values())
                .filter(type -> type.caseStatus.equalsIgnoreCase(value))
                .findFirst()
                .orElse(null);
    }



}
