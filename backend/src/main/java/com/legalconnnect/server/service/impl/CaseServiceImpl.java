package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.config.PaginationResponse;
import com.legalconnnect.server.dto.cases.CaseRequestDto;
import com.legalconnnect.server.dto.cases.CaseResponseDto;
import com.legalconnnect.server.dto.event.EventResponseDto;
import com.legalconnnect.server.enums.CaseStatus;
import com.legalconnnect.server.enums.CaseType;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.model.Case;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.CaseRepository;
import com.legalconnnect.server.repository.UserRepository;
import com.legalconnnect.server.service.CaseService;
import com.legalconnnect.server.service.EventService;
import com.legalconnnect.server.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class CaseServiceImpl implements CaseService {
    private final UserService userService;
    private final UserRepository userRepository;
    private final CaseRepository caseRepository;
    private final EventService eventService;

    @Override
    public CaseResponseDto toDto(Case aCase) {
        CaseResponseDto caseResponseDto = new CaseResponseDto();
        caseResponseDto.setCaseName(aCase.getCaseName());
        caseResponseDto.setCaseStatus(CaseStatus.fromString(aCase.getCaseStatus()));
        caseResponseDto.setCaseNumber(aCase.getCaseNumber());
        caseResponseDto.setCaseType(aCase.getCaseType().toString());
        caseResponseDto.setId(aCase.getId());
        caseResponseDto.setClient(userService.toDto(aCase.getClient()));
        caseResponseDto.setLawyer(userService.toDto(aCase.getLawyer()));
        caseResponseDto.setCourt(aCase.getCourt());
        caseResponseDto.setCreatedDate(aCase.getCreatedDate());
        caseResponseDto.setDeadline(aCase.getDeadline());
        caseResponseDto.setOppositionParty(aCase.getOppositionParty());

        try {
            EventResponseDto latestUpcomingEventByCase = eventService.getLatestUpcomingEventByCase(aCase.getId());
            caseResponseDto.setUpcomingEvent(latestUpcomingEventByCase);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return caseResponseDto;
    }

    @Override
    public Case toModel(CaseRequestDto caseRequestDto) {
        Case aCase = new Case();
        aCase.setCaseNumber(caseRequestDto.getCaseNumber());
        aCase.setCaseName(caseRequestDto.getCaseName());
        aCase.setCaseType(caseRequestDto.getCaseType());

        UserInfo client = userRepository.findById(caseRequestDto.getClientId()).orElseThrow(() -> new NotFoundException("Client Not Found!"));
        UserInfo lawyer = userRepository.findById(caseRequestDto.getLawyerId()).orElseThrow(() -> new NotFoundException("Lawyer Not Found!"));
        aCase.setClient(client);
        aCase.setLawyer(lawyer);

        aCase.setOppositionParty(caseRequestDto.getOppositionParty());
        aCase.setCourt(caseRequestDto.getCourt());

        // update created date, deadline and case status according to the relevance;

        return aCase;
    }

    @Override
    public List<String> getCaseTypes() {
        return CaseType.extractEnum();
    }

    @Override
    public CaseResponseDto createCase(CaseRequestDto caseRequestDto) throws Exception {
        Case aCase = toModel(caseRequestDto);
        aCase.setCaseStatus(CaseStatus.ON_HOLD.toString());
        aCase.setCreatedDate(new Date());

        Case savedCase = caseRepository.saveAndFlush(aCase);

        return toDto(savedCase);
    }

    @Override
    public PaginationResponse<CaseResponseDto> findByPageWise(Integer lawyerId, Integer page, Integer pageSize, String name, CaseStatus caseStatus) throws Exception {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Case> casesByPageWise = caseRepository.findByPageWise(lawyerId, caseStatus == null ? null : caseStatus.toString(), name, pageable);
        List<CaseResponseDto> caseList = casesByPageWise.map(this::toDto).stream().toList();
        return new PaginationResponse<>(caseList, casesByPageWise.getTotalElements());
    }

    @Override
    public List<CaseResponseDto> getCaseListByUser(Integer userId) throws Exception {
        List<Case> casesByUserId = caseRepository.findByClientId(userId);
        return casesByUserId.stream().map(this::toDto).toList();
    }

    @Override
    public CaseResponseDto getById(Integer id) throws Exception {
        Case aCase = caseRepository.findById(id).orElseThrow(() -> new NotFoundException("Case Not Found!"));
        return toDto(aCase);
    }

    @Override
    public CaseResponseDto updateStatus(Integer caseId, CaseStatus caseStatus) throws Exception {
        Case aCase = caseRepository.findById(caseId).orElseThrow(() -> new NotFoundException("Case Not Found!"));
        aCase.setCaseStatus(caseStatus.toString());
        Case updatedCase = caseRepository.saveAndFlush(aCase);
        return toDto(updatedCase);
    }
}
