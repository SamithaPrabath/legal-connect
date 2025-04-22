package com.legalconnnect.server.service;

import com.legalconnnect.server.common.service.MapperService;
import com.legalconnnect.server.config.PaginationResponse;
import com.legalconnnect.server.dto.user.UserRequestDto;
import com.legalconnnect.server.dto.user.UserResponseDto;
import com.legalconnnect.server.enums.SortOptionEnum;
import com.legalconnnect.server.model.Review;
import com.legalconnnect.server.model.UserInfo;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService extends MapperService<UserRequestDto, UserResponseDto, UserInfo> {
    PaginationResponse<UserResponseDto> findLawyersPageWise(int page, int pageSize, String searchKey) throws Exception;
    UserResponseDto getById(Integer id) throws Exception;
    List<UserResponseDto> getListByIds(List<Integer> idList) throws Exception;
    List<UserResponseDto> searchByName(String name) throws Exception;
    List<UserResponseDto> findLawyer(String caseType, String language, String location, SortOptionEnum sortBy) throws Exception;

    UserResponseDto createOne(UserRequestDto userRequestDto) throws Exception;
    UserResponseDto updateOne(Integer id, UserRequestDto userRequestDto) throws Exception;

    void updateLawyerReviews(Review review) throws Exception;

    void verifyLawyer(Integer userId) throws Exception;
    void denyLawyer(Integer userId) throws  Exception;


}
