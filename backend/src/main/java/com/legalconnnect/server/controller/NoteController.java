package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.note.NoteRequestDto;
import com.legalconnnect.server.dto.note.NoteResponseDto;
import com.legalconnnect.server.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${endpoints.notes}")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<StandardResponse<List<NoteResponseDto>>> getNoteListByUserAndCase(@RequestParam Integer userId, @RequestParam Integer caseId) throws Exception {
        List<NoteResponseDto> notesByUserAndCase = noteService.getNotesByUserAndCase(userId, caseId);
        return ResponseEntityManager.ok(notesByUserAndCase);
    }

    @PostMapping
    public ResponseEntity<StandardResponse<NoteResponseDto>> createNote(@RequestBody NoteRequestDto requestDto) throws Exception {
        NoteResponseDto createdNote = noteService.createOne(requestDto);
        return ResponseEntityManager.created(createdNote, "Note created successfully!");
    }

    @DeleteMapping("/{noteId}")
    public void deleteNote(@PathVariable Integer noteId) throws Exception {
        noteService.deleteOne(noteId);
    }
}
