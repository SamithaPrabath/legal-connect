package com.legalconnnect.server.service;

import com.legalconnnect.server.common.service.MapperService;
import com.legalconnnect.server.config.PaginationResponse;
import com.legalconnnect.server.dto.cases.CaseRequestDto;
import com.legalconnnect.server.dto.cases.CaseResponseDto;
import com.legalconnnect.server.enums.CaseStatus;
import com.legalconnnect.server.model.Case;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CaseService extends MapperService<CaseRequestDto, CaseResponseDto, Case> {
    List<String> getCaseTypes();
    CaseResponseDto createCase(CaseRequestDto caseRequestDto) throws Exception;
    PaginationResponse<CaseResponseDto> findByPageWise(Integer lawyerId, Integer page, Integer pageSize, String name, CaseStatus caseStatus) throws Exception;
    List<CaseResponseDto> getCaseListByUser(Integer userId) throws Exception;
    CaseResponseDto getById(Integer id) throws Exception;
    CaseResponseDto updateStatus(Integer caseId, CaseStatus caseStatus) throws Exception;
}
