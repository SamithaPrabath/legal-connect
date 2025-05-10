package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.document.DocumentRequestDto;
import com.legalconnnect.server.dto.document.DocumentResponseDto;
import com.legalconnnect.server.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${endpoints.document}")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService documentService;

    @PostMapping
    public ResponseEntity<StandardResponse<DocumentResponseDto>> uploadDocument(@RequestBody DocumentRequestDto requestDto) throws Exception {
        DocumentResponseDto responseDto = documentService.uploadDocument(requestDto);
        return ResponseEntityManager.ok(responseDto);
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<StandardResponse<DocumentResponseDto>> replaceDocument(@RequestBody DocumentRequestDto requestDto, @PathVariable Integer documentId) throws Exception {
        DocumentResponseDto responseDto = documentService.replaceDocument(documentId, requestDto);
        return ResponseEntityManager.ok(responseDto);
    }

    @GetMapping("/byCaseId/{caseId}")
    public ResponseEntity<StandardResponse<List<DocumentResponseDto>>> getDocumentsByCaseId(@PathVariable Integer caseId) throws Exception {
        List<DocumentResponseDto> documentsByCaseId = documentService.getDocumentsByCaseId(caseId);
        return ResponseEntityManager.ok(documentsByCaseId);
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Integer documentId) throws Exception {

        byte[] file = documentService.downloadDocument(documentId);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Disposition", "attachment; filename=file.pdf"); // Change filename as needed
        headers.set("Content-Type", "application/octet-stream");

        return new ResponseEntity<>(file, headers, HttpStatus.OK);
    }
}
