package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.dto.document.DocumentRequestDto;
import com.legalconnnect.server.dto.document.DocumentResponseDto;
import com.legalconnnect.server.enums.UserType;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.model.Case;
import com.legalconnnect.server.model.Document;
import com.legalconnnect.server.repository.CaseRepository;
import com.legalconnnect.server.repository.DocumentRepository;
import com.legalconnnect.server.service.DocumentService;
import com.legalconnnect.server.service.TimelineEventService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class DocumentServiceImpl implements DocumentService {
    private final CaseRepository caseRepository;
    private final DocumentRepository documentRepository;
    private final TimelineEventService timelineEventService;

    @Override
    public DocumentResponseDto toDto(Document document) {
        DocumentResponseDto responseDto = new DocumentResponseDto();
        responseDto.setId(document.getId());
        responseDto.setTitle(document.getTitle());
        responseDto.setDescription(document.getDescription());
        responseDto.setUserType(document.getUserType().toString());
        responseDto.setFileName(document.getFileName());
        responseDto.setCaseId(document.getACase().getId());
        return responseDto;
    }

    @Override
    public Document toModel(DocumentRequestDto documentRequestDto) {
        Document document = new Document();
        document.setTitle(documentRequestDto.getTitle());
        document.setDescription(documentRequestDto.getDescription());
        document.setFileName(documentRequestDto.getFileName());
        document.setUserType(documentRequestDto.getUserType());

        Case aCase = caseRepository.findById(documentRequestDto.getCaseId()).orElseThrow(() -> new NotFoundException("Case Not Found!"));
        document.setACase(aCase);
        byte[] file = convertBase64(documentRequestDto.getFile());
        document.setFile(file);
        return document;
    }

    private byte[] convertBase64(String base64String) {
       return Base64.getDecoder().decode(base64String);
    }

    @Override
    public byte[] downloadDocument(Integer id) throws Exception {
        Document document = documentRepository.findById(id).orElseThrow(() -> new NotFoundException("Document not found!"));
        return document.getFile();
    }

    @Override
    public DocumentResponseDto uploadDocument(DocumentRequestDto requestDto) throws Exception {
        Document document = toModel(requestDto);
        return getDocumentResponseDto(document, "uploaded new");
    }

    @Override
    public DocumentResponseDto replaceDocument(Integer id, DocumentRequestDto requestDto) throws Exception {
        boolean documentExists = documentRepository.existsById(id);
        if (!documentExists) throw new NotFoundException("Document Not Found!");

        Document document = toModel(requestDto);
        document.setId(id);
        return getDocumentResponseDto(document, "replaced");
    }

    private DocumentResponseDto getDocumentResponseDto(Document document, String actionType) throws Exception {
        Document replacedDocument = documentRepository.saveAndFlush(document);

        boolean isUserLawyer = document.getUserType() == UserType.LAWYER;
        String userFirstName = isUserLawyer ? replacedDocument.getACase().getLawyer().getBasicInfo().getFirstName() :
                replacedDocument.getACase().getClient().getBasicInfo().getFirstName();

        timelineEventService.saveEvent(String.format("%s %s document: %s", userFirstName, actionType, document.getTitle()),
                replacedDocument.getACase().getId());
        return toDto(replacedDocument);
    }

    @Override
    public List<DocumentResponseDto> getDocumentsByCaseId(Integer caseId) throws Exception {
        List<Document> documentList = documentRepository.findByCaseId(caseId);
        return documentList.stream().map(this::toDto).toList();
    }
}
