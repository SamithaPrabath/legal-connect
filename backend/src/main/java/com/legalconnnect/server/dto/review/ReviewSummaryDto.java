package com.legalconnnect.server.dto.review;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewSummaryDto {
    @JsonProperty("5")
    private Double five;
    @JsonProperty("4")
    private Double four;
    @JsonProperty("3")
    private Double three;
    @JsonProperty("2")
    private Double two;
    @JsonProperty("1")
    private Double one;
}
