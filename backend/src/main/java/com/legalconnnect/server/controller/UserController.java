package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.PaginationResponse;
import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.user.UserRequestDto;
import com.legalconnnect.server.dto.user.UserResponseDto;
import com.legalconnnect.server.enums.SortOptionEnum;
import com.legalconnnect.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${endpoints.user}")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<StandardResponse<UserResponseDto>> getOne(@PathVariable Integer userId) throws  Exception {
        UserResponseDto userById = userService.getById(userId);
        return ResponseEntityManager.ok(userById);
    }

    @GetMapping("/list")
    public ResponseEntity<StandardResponse<List<UserResponseDto>>> getByIdList(@RequestParam List<Integer> idList) throws Exception {
        List<UserResponseDto> listByIds = userService.getListByIds(idList);
        return ResponseEntityManager.ok(listByIds);
    }

    @GetMapping
    public ResponseEntity<StandardResponse<List<UserResponseDto>>> searchUsers(@RequestParam String firstName) throws Exception {
        List<UserResponseDto> userList = userService.searchByName(firstName);
        return ResponseEntityManager.ok(userList);
    }

    @GetMapping("/findLawyer")
    public ResponseEntity<StandardResponse<List<UserResponseDto>>> findLawyer(@RequestParam String caseType, @RequestParam String language, @RequestParam String location, @RequestParam String sortBy) throws Exception {
        SortOptionEnum sortOptionEnum = SortOptionEnum.fromString(sortBy);
        List<UserResponseDto> lawyerList = userService.findLawyer(caseType, language, location, sortOptionEnum);
        return ResponseEntityManager.ok(lawyerList);
    }

    @GetMapping("/page")
    public ResponseEntity<StandardResponse<PaginationResponse<UserResponseDto>>> getUserPage(@RequestParam Integer page, @RequestParam Integer pageSize, @RequestParam String key) throws Exception {
        PaginationResponse<UserResponseDto> lawyersPageWise = userService.findLawyersPageWise(page, pageSize, key);
        return ResponseEntityManager.ok(lawyersPageWise);
    }

    @PostMapping
    public ResponseEntity<StandardResponse<UserResponseDto>> createOne(@RequestBody UserRequestDto requestDto) throws Exception {
        UserResponseDto createdUser = userService.createOne(requestDto);
        return ResponseEntityManager.created(createdUser, "User created successfully!");
    }

    @PutMapping("/{profileId}")
    public ResponseEntity<StandardResponse<UserResponseDto>> updateOne(@PathVariable Integer profileId, @RequestBody UserRequestDto requestDto) throws Exception {
        UserResponseDto userResponseDto = userService.updateOne(profileId, requestDto);
        return ResponseEntityManager.ok(userResponseDto);
    }

    @PutMapping("/verify/{profileId}")
    public void verifyLawyer(@PathVariable Integer profileId) throws Exception {
        userService.verifyLawyer(profileId);
    }

    @PutMapping("/deny/{profileId}")
    public void denyLawyer(@PathVariable Integer profileId) throws Exception {
        userService.denyLawyer(profileId);
    }
}
