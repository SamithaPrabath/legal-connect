package com.legalconnnect.server.dto.document;

import com.legalconnnect.server.enums.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DocumentRequestDto {
    private String title;
    private String description;
    private String fileName;
    private UserType userType;
    private Integer caseId;
    private String file;
}
