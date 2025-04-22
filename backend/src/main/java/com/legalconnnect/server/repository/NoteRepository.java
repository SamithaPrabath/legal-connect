package com.legalconnnect.server.repository;

import com.legalconnnect.server.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    @Query("SELECT n FROM Note n WHERE n.aCase.id = :caseId AND n.user.id = :userId")
    List<Note> findByACase_IdAndUser_Id(Integer caseId, Integer userId);
}
