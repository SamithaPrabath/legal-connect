package com.legalconnnect.server.dto.note;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteRequestDto {
    private String date;
    private String time;
    private String note;
    private Integer caseId;
    private Integer userId;
}
