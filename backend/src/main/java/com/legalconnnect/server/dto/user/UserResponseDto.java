package com.legalconnnect.server.dto.user;

import com.legalconnnect.server.config.user.AboutInfo;
import com.legalconnnect.server.config.user.BasicInfo;
import com.legalconnnect.server.config.user.ContactInfo;
import com.legalconnnect.server.enums.LawyerStatus;
import com.legalconnnect.server.enums.UserStatus;
import com.legalconnnect.server.enums.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponseDto {
    private Integer id;
    private String type;
    private BasicInfo basicInfo;
    private ContactInfo contactInfo;

    // following fields only for lawyers
    private AboutInfo aboutInfo;
    private String status;
    private String lawyerStatus;
    private Integer reviewCount;
    private Double rating;
}
