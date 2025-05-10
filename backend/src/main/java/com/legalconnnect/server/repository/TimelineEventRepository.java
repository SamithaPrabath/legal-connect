package com.legalconnnect.server.repository;

import com.legalconnnect.server.model.TimeLineEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TimelineEventRepository extends JpaRepository<TimeLineEvent, Integer> {
    @Query("SELECT tle FROM TimeLineEvent  tle WHERE tle.aCase.id = :caseId ORDER BY tle.date ASC")
    List<TimeLineEvent> getTimeLineEventByCaseId(Integer caseId);
}
