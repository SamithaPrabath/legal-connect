package com.legalconnnect.server.service;

import com.legalconnnect.server.dto.timelineEvent.TimeLineEventResponseDto;

import java.util.List;

public interface TimelineEventService {
    void saveEvent(String message, Integer caseId) throws Exception;
    List<TimeLineEventResponseDto> getTimeLineEventsByCase(Integer caseId);
}
