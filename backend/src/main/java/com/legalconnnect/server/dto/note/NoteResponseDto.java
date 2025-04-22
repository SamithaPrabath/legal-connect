package com.legalconnnect.server.dto.note;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteResponseDto {
    private Integer id;
    private String date;
    private String time;
    private String note;
}
