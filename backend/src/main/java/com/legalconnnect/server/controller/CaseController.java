package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.PaginationResponse;
import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.cases.CaseRequestDto;
import com.legalconnnect.server.dto.cases.CaseResponseDto;
import com.legalconnnect.server.enums.CaseStatus;
import com.legalconnnect.server.service.CaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${endpoints.cases}")
@RequiredArgsConstructor
public class CaseController {
    private final CaseService caseService;

    @GetMapping(path = "/listByUser/{profileId}")
    public ResponseEntity<StandardResponse<List<CaseResponseDto>>> getCasesByUser(@PathVariable Integer profileId) throws Exception {
        List<CaseResponseDto> caseListByUser = caseService.getCaseListByUser(profileId);
        return ResponseEntityManager.ok(caseListByUser);
    }

    @GetMapping(path = "/page/{lawyerId}")
    public ResponseEntity<StandardResponse<PaginationResponse<CaseResponseDto>>> getCasePageByLawyer(@PathVariable Integer lawyerId, @RequestParam Integer page, @RequestParam Integer pageSize, @RequestParam String name, @RequestParam(defaultValue = "") String status) throws Exception {
        CaseStatus caseStatus = CaseStatus.fromString(status);
        PaginationResponse<CaseResponseDto> paginationResponse = caseService.findByPageWise(lawyerId, page, pageSize, name, caseStatus);
        return ResponseEntityManager.ok(paginationResponse);
    }

    @GetMapping(path = "/case-types")
    public ResponseEntity<StandardResponse<List<String>>> getCaseTypes() {
        List<String> caseTypes = caseService.getCaseTypes();
        return ResponseEntityManager.ok(caseTypes);
    }

    @PostMapping
    public ResponseEntity<StandardResponse<CaseResponseDto>> createCase(@RequestBody CaseRequestDto requestDto) throws Exception {
        CaseResponseDto createdCase = caseService.createCase(requestDto);
        return ResponseEntityManager.created(createdCase, "Case created successfully!");
    }

    @GetMapping(path = "/{caseId}")
    public ResponseEntity<StandardResponse<CaseResponseDto>> getOne(@PathVariable Integer caseId) throws Exception {
        CaseResponseDto caseById = caseService.getById(caseId);
        return ResponseEntityManager.ok(caseById);
    }

    @PutMapping(path = "/{caseId}")
    public ResponseEntity<StandardResponse<CaseResponseDto>> updateStatus(@PathVariable Integer caseId, @RequestParam String status) throws Exception {
        CaseResponseDto caseResponseDto = caseService.updateStatus(caseId, CaseStatus.fromString(status));
        return ResponseEntityManager.ok(caseResponseDto, "Case updated!");
    }

}
