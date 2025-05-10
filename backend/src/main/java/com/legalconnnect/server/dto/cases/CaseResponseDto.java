package com.legalconnnect.server.dto.cases;

import com.legalconnnect.server.config.cases.Court;
import com.legalconnnect.server.config.cases.OppositionParty;
import com.legalconnnect.server.dto.event.EventResponseDto;
import com.legalconnnect.server.dto.user.UserResponseDto;
import com.legalconnnect.server.enums.CaseStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class CaseResponseDto {
    private Integer id;
    private String caseNumber;
    private String caseName;
    private String caseType;
    private UserResponseDto client;
    private UserResponseDto lawyer;
    private OppositionParty oppositionParty;
    private Court court;
    private CaseStatus caseStatus;

    private Date createdDate;
    private Date deadline;
    private EventResponseDto upcomingEvent;
}
