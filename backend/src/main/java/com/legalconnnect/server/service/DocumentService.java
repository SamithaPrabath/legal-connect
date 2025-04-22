package com.legalconnnect.server.service;

import com.legalconnnect.server.common.service.MapperService;
import com.legalconnnect.server.dto.document.DocumentRequestDto;
import com.legalconnnect.server.dto.document.DocumentResponseDto;
import com.legalconnnect.server.model.Document;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DocumentService extends MapperService<DocumentRequestDto, DocumentResponseDto, Document> {
    byte[] downloadDocument(Integer id) throws Exception;
    DocumentResponseDto uploadDocument(DocumentRequestDto requestDto) throws Exception;
    DocumentResponseDto replaceDocument(Integer id, DocumentRequestDto requestDto) throws Exception;
    List<DocumentResponseDto> getDocumentsByCaseId(Integer caseId) throws Exception;
}
