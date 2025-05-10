package com.legalconnnect.server.dto.review;

import com.legalconnnect.server.dto.user.UserResponseDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewRequestDto {
    private Integer clientId;
    private Integer lawyerId;
    private String date;
    private Integer rating;
    private String title;
    private String description;
}
