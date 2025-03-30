package com.legalconnnect.server.dto.event;

import com.legalconnnect.server.enums.TimeSlot;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventRequestDto {
    private Integer caseId;
    private String title;
    private String description;
    private String date;
    private TimeSlot time;
    private Integer clientId;
    private Integer lawyerId;
}
