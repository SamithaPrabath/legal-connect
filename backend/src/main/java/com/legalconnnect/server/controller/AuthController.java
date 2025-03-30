package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.auth.AuthRequestDto;
import com.legalconnnect.server.dto.auth.AuthResponseDto;
import com.legalconnnect.server.dto.user.UserRequestDto;
import com.legalconnnect.server.dto.user.UserResponseDto;
import com.legalconnnect.server.service.AuthService;
import com.legalconnnect.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${endpoints.portal}")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/token")
    public ResponseEntity<AuthResponseDto> authenticateUser(@RequestBody AuthRequestDto authRequestDto) throws Exception {
        AuthResponseDto authResponseDto = authService.authenticate(authRequestDto);
        return ResponseEntity.ok(authResponseDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<StandardResponse<UserResponseDto>> createOne(@RequestBody UserRequestDto requestDto) throws Exception {
        UserResponseDto createdUser = userService.createOne(requestDto);
        return ResponseEntityManager.created(createdUser, "User created successfully!");
    }
}

