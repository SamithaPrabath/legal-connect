package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.config.PaginationResponse;
import com.legalconnnect.server.dto.user.UserRequestDto;
import com.legalconnnect.server.dto.user.UserResponseDto;
import com.legalconnnect.server.enums.LawyerStatus;
import com.legalconnnect.server.enums.SortOptionEnum;
import com.legalconnnect.server.enums.UserStatus;
import com.legalconnnect.server.enums.UserType;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.exception.ValidationException;
import com.legalconnnect.server.model.Review;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.UserRepository;
import com.legalconnnect.server.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public PaginationResponse<UserResponseDto> findLawyersPageWise(int page, int pageSize, String searchKey) throws Exception {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<UserInfo> lawyersByPageWise = userRepository.findLawyersByPageWise(searchKey, pageable);
        List<UserResponseDto> lawyerList = lawyersByPageWise.map(this::toDto).stream().toList();
        return new PaginationResponse<>(lawyerList, lawyersByPageWise.getTotalElements());
    }

    @Override
    public UserResponseDto getById(Integer id) throws Exception {
        UserInfo user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        return toDto(user);
    }

    @Override
    public List<UserResponseDto> getListByIds(List<Integer> idList) throws Exception {
        List<UserInfo> userListByIds = userRepository.findAllById(idList);
        return userListByIds.stream().map(this::toDto).toList();
    }

    @Override
    public List<UserResponseDto> searchByName(String name) throws Exception {
        List<UserInfo> users = userRepository.searchByName(name);
        return users.stream().map(this::toDto).toList();
    }

    @Override
    public List<UserResponseDto> findLawyer(String caseType, String language, String location, SortOptionEnum sortBy) throws Exception {
        List<UserInfo> lawyerList = userRepository.searchLawyerList(caseType, language, location);
        return lawyerList.stream().map(this::toDto).toList();
    }

    @Override
    public UserResponseDto createOne(UserRequestDto userRequestDto) throws Exception {
        UserInfo user = toModel(userRequestDto);
        if (user.getType() == UserType.LAWYER) {
            user.setRating(0);
            user.setStatus(UserStatus.UNAVAILABLE);
            user.setLawyerStatus(LawyerStatus.PENDING);
            user.setReviewCount(0);
            user.setAboutInfo(userRequestDto.getAboutInfo());
        }
        UserInfo savedUser = userRepository.saveAndFlush(user);

        return toDto(savedUser);
    }

    @Override
    public UserResponseDto updateOne(Integer id, UserRequestDto userRequestDto) throws Exception {
        UserInfo existingUser = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not available"));

        existingUser.setBasicInfo(userRequestDto.getBasicInfo());
        existingUser.setContactInfo(userRequestDto.getContactInfo());

        if (existingUser.getType() == UserType.LAWYER)
            existingUser.setAboutInfo(userRequestDto.getAboutInfo());

        UserInfo updatedUser = userRepository.saveAndFlush(existingUser);
        return toDto(updatedUser);
    }

    @Override
    public void updateLawyerReviews(Review review) throws Exception {
        UserInfo lawyer = review.getLawyer();
        int currentRating = lawyer.getRating();
        int currentReviewCount = lawyer.getReviewCount();
        int updatedReviewCount = currentReviewCount + 1;
        int updatedRating = (currentRating * currentReviewCount + review.getRating()) / updatedReviewCount;

        lawyer.setReviewCount(updatedReviewCount);
        lawyer.setRating(updatedRating);

        userRepository.saveAndFlush(lawyer);
    }

    @Override
    public void verifyLawyer(Integer userId) throws Exception {
        UserInfo userInfo = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        if (userInfo.getType() != UserType.LAWYER) throw new ValidationException("User is not a lawyer", null);

        userInfo.setLawyerStatus(LawyerStatus.VERIFIED);
        userInfo.setStatus(UserStatus.AVAILABLE);
        userRepository.saveAndFlush(userInfo);
    }

    @Override
    public void denyLawyer(Integer userId) throws Exception {
        UserInfo userInfo = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        if (userInfo.getType() != UserType.LAWYER) throw new ValidationException("User is not a lawyer", null);

        userInfo.setLawyerStatus(LawyerStatus.DENIED);
        userRepository.saveAndFlush(userInfo);
    }

    @Override
    public UserResponseDto toDto(UserInfo user) {
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(user.getId());
        userResponseDto.setBasicInfo(user.getBasicInfo());
        userResponseDto.setContactInfo(user.getContactInfo());
        userResponseDto.setType(user.getType().getUserType());

        if (user.getType() == UserType.LAWYER) {
            userResponseDto.setRating(user.getRating());
            userResponseDto.setAboutInfo(user.getAboutInfo());
            userResponseDto.setStatus(user.getStatus().toString());
            userResponseDto.setLawyerStatus(user.getLawyerStatus().toString());
            userResponseDto.setReviewCount(user.getReviewCount());
        }

        return userResponseDto;
    }

    @Override
    public UserInfo toModel(UserRequestDto userRequestDto) {
        UserInfo user = new UserInfo();
        user.setBasicInfo(userRequestDto.getBasicInfo());
        user.setContactInfo(userRequestDto.getContactInfo());
        user.setAboutInfo(userRequestDto.getAboutInfo());
        user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        user.setType(userRequestDto.getType());

        return user;
    }
}
