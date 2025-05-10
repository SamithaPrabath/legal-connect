package com.legalconnnect.server.repository;

import com.legalconnnect.server.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {
    @Query("SELECT d FROM Document d WHERE  d.aCase.id = :id")
    List<Document> findByCaseId(Integer id);
}
