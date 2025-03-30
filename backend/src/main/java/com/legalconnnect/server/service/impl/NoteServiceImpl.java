package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.dto.note.NoteRequestDto;
import com.legalconnnect.server.dto.note.NoteResponseDto;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.model.Case;
import com.legalconnnect.server.model.Note;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.CaseRepository;
import com.legalconnnect.server.repository.NoteRepository;
import com.legalconnnect.server.repository.UserRepository;
import com.legalconnnect.server.service.NoteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class NoteServiceImpl implements NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CaseRepository caseRepository;

    @Override
    public List<NoteResponseDto> getNotesByUserAndCase(Integer userId, Integer caseId) throws Exception {
        List<Note> notesByUserAndCase = noteRepository.findByACase_IdAndUser_Id(caseId, userId);
        return notesByUserAndCase.stream().map(this::toDto).toList();
    }

    @Override
    public NoteResponseDto createOne(NoteRequestDto noteRequestDto) throws Exception {
        Note note = toModel(noteRequestDto);
        Note savedNote = noteRepository.saveAndFlush(note);
        return toDto(savedNote);
    }

    @Override
    public void deleteOne(Integer noteId) throws Exception {
        if (!noteRepository.existsById(noteId)) throw new NotFoundException("Note not found");
        noteRepository.deleteById(noteId);
    }

    @Override
    public NoteResponseDto toDto(Note note) {
        NoteResponseDto noteResponseDto = new NoteResponseDto();
        noteResponseDto.setNote(note.getNote());
        noteResponseDto.setId(note.getId());
        noteResponseDto.setTime(note.getTime());
        noteResponseDto.setDate(note.getDate());
        return noteResponseDto;
    }

    @Override
    public Note toModel(NoteRequestDto noteRequestDto) {
        Note note = new Note();

        UserInfo user = userRepository.findById(noteRequestDto.getUserId()).orElseThrow(() -> new NotFoundException("User not found!"));
        Case aCase = caseRepository.findById(noteRequestDto.getCaseId()).orElseThrow(() -> new NotFoundException("Case not found!"));

        note.setUser(user);
        note.setACase(aCase);
        note.setTime(noteRequestDto.getTime());
        note.setDate(noteRequestDto.getDate());
        note.setNote(noteRequestDto.getNote());
        return note;
    }
}
