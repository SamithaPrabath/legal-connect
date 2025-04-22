package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.dto.auth.AuthRequestDto;
import com.legalconnnect.server.dto.auth.AuthResponseDto;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.UserRepository;
import com.legalconnnect.server.security.JwtUtil;
import com.legalconnnect.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public AuthResponseDto authenticate(AuthRequestDto authRequestDto) throws Exception {
        Authentication authentication = new UsernamePasswordAuthenticationToken(authRequestDto.getEmail(), authRequestDto.getPassword());
        authenticationManager.authenticate(authentication);
        String token = jwtUtil.generateToken(authentication);

        UserInfo userInfo = userRepository.findUserByEmail(authRequestDto.getEmail()).orElseThrow(() -> new NotFoundException("User not found!"));
        return new AuthResponseDto(token, userInfo.getType().name(), userInfo.getId());
    }
}
