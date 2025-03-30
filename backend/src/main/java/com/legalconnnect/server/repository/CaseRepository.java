package com.legalconnnect.server.repository;

import com.legalconnnect.server.enums.CaseStatus;
import com.legalconnnect.server.model.Case;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseRepository extends JpaRepository<Case, Integer> {
    @Query("SELECT c FROM Case c WHERE (:caseStatus IS NULL OR c.caseStatus = :caseStatus) AND c.lawyer.id = :lawyerId AND c.caseName LIKE %:name%")
    Page<Case> findByPageWise(Integer lawyerId, String caseStatus, String name, Pageable pageable);
    List<Case> findByClientId(Integer id);
}
