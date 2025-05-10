package com.legalconnnect.server.dto.cases;

import com.legalconnnect.server.config.cases.Court;
import com.legalconnnect.server.config.cases.OppositionParty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CaseRequestDto {
    private String caseNumber;
    private String caseName;
    private String caseType;
    private Integer clientId;
    private Integer lawyerId;
    private OppositionParty oppositionParty;
    private Court court;
}
