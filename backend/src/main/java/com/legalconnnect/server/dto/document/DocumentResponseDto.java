package com.legalconnnect.server.dto.document;

import com.legalconnnect.server.enums.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DocumentResponseDto {
    private Integer id;
    private String title;
    private String description;
    private String userType;
    private String fileName;
    private Integer caseId;
}
