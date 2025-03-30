package com.legalconnnect.server.dto.user;

import com.legalconnnect.server.config.user.AboutInfo;
import com.legalconnnect.server.config.user.BasicInfo;
import com.legalconnnect.server.config.user.ContactInfo;
import com.legalconnnect.server.enums.UserType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRequestDto {
    private UserType type;
    private String password;
    private BasicInfo basicInfo;
    private ContactInfo contactInfo;
    private AboutInfo aboutInfo;
}
