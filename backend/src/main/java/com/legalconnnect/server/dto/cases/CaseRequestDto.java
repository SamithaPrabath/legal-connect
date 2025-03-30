package com.legalconnnect.server.dto.cases;

import com.legalconnnect.server.config.cases.Court;
import com.legalconnnect.server.config.cases.OppositionParty;
import com.legalconnnect.server.enums.CaseType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CaseRequestDto {
    private String caseNumber;
    private String caseName;
    private CaseType caseType;
    private Integer clientId;
    private Integer lawyerId;
    private OppositionParty oppositionParty;
    private Court court;
}
