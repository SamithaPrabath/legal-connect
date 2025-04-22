package com.legalconnnect.server.service;

import com.legalconnnect.server.common.service.MapperService;
import com.legalconnnect.server.dto.note.NoteRequestDto;
import com.legalconnnect.server.dto.note.NoteResponseDto;
import com.legalconnnect.server.model.Note;
import org.springframework.stereotype.Service;

import java.util.List;

public interface NoteService extends MapperService<NoteRequestDto, NoteResponseDto, Note> {
    List<NoteResponseDto> getNotesByUserAndCase(Integer userId, Integer caseId) throws Exception;
    NoteResponseDto createOne(NoteRequestDto noteRequestDto) throws Exception;
    void deleteOne(Integer noteId) throws Exception;
}
