package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.dto.timelineEvent.TimeLineEventResponseDto;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.model.Case;
import com.legalconnnect.server.model.TimeLineEvent;
import com.legalconnnect.server.repository.CaseRepository;
import com.legalconnnect.server.repository.TimelineEventRepository;
import com.legalconnnect.server.service.TimelineEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class TimelineEventServiceImpl implements TimelineEventService {
    private final TimelineEventRepository timelineEventRepository;
    private final CaseRepository caseRepository;

    @Override
    public void saveEvent(String message, Integer caseId) throws Exception {
        Case caseByEvent = caseRepository.findById(caseId)
                .orElseThrow(() -> new NotFoundException("Case Not Found!"));
        TimeLineEvent timeLineEvent = new TimeLineEvent(message, caseByEvent);
        timelineEventRepository.save(timeLineEvent);
    }

    @Override
    public List<TimeLineEventResponseDto> getTimeLineEventsByCase(Integer caseId) {
        List<TimeLineEvent> timeLineEventByCaseId = timelineEventRepository.getTimeLineEventByCaseId(caseId);
        return timeLineEventByCaseId.stream().map(timeLineEvent ->
             new TimeLineEventResponseDto(dateFormatter(timeLineEvent.getDate()), timeLineEvent.getDescription())
        ).toList();
    }

    private String dateFormatter(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d, yyyy h:mm a", Locale.ENGLISH);
        return date.format(formatter);
    }
}
