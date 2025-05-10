package com.legalconnnect.server.service;

import com.legalconnnect.server.common.service.MapperService;
import com.legalconnnect.server.dto.event.EventRequestDto;
import com.legalconnnect.server.dto.event.EventResponseDto;
import com.legalconnnect.server.dto.event.TimeLineEventResponseDto;
import com.legalconnnect.server.model.Event;

import java.util.List;

public interface EventService extends MapperService<EventRequestDto, EventResponseDto, Event> {
    EventResponseDto createOne(EventRequestDto requestDto) throws Exception;
    List<String> getAvailableTimeSlot(Integer lawyerId, String date) throws Exception;
    List<EventResponseDto> getUpcomingEvents(Integer userId) throws Exception;
    List<EventResponseDto> getEventsByCase(Integer caseId) throws Exception;
    List<TimeLineEventResponseDto> getTimeLineEventList(Integer caseId) throws Exception;
    List<EventResponseDto> getScheduleByDate(Integer lawyerId, String date) throws Exception;
    EventResponseDto getLatestUpcomingEventByCase(Integer caseId) throws Exception;
}
