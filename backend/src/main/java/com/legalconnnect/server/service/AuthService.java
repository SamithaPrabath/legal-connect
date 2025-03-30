package com.legalconnnect.server.service;

import com.legalconnnect.server.dto.auth.AuthRequestDto;
import com.legalconnnect.server.dto.auth.AuthResponseDto;
import org.springframework.stereotype.Service;

public interface AuthService {
    AuthResponseDto authenticate(AuthRequestDto authRequestDto) throws Exception;
}