package com.legalconnnect.server.repository;

import com.legalconnnect.server.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByLawyerIdAndDate(Integer lawyerId, LocalDate date);
    @Query("SELECT e FROM Event e WHERE e.aCase.id = :caseId")
    List<Event> findByCaseId(Integer caseId);

    @Query(value = "SELECT e FROM Event e WHERE e.lawyer.id  = :userId OR e.client.id = :userId AND e.date >= CURRENT_DATE ")
    List<Event> getUpcomingEvents(Integer userId);
}
