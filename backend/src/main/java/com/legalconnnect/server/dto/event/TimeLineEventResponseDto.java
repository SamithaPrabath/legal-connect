package com.legalconnnect.server.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeLineEventResponseDto {
    private String date;
    private String description;
}
