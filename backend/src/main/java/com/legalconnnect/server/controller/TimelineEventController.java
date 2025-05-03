package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.timelineEvent.TimeLineEventResponseDto;
import com.legalconnnect.server.service.TimelineEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${endpoints.timeline-event}")
@RequiredArgsConstructor
public class TimelineEventController {
    private final TimelineEventService timelineEventService;

    @GetMapping("/{caseId}")
    public ResponseEntity<StandardResponse<List<TimeLineEventResponseDto>>> getTimeLineEvents(@PathVariable Integer caseId) throws Exception {
        List<TimeLineEventResponseDto> timeLineEventsByCase = timelineEventService.getTimeLineEventsByCase(caseId);
        return ResponseEntityManager.ok(timeLineEventsByCase);
    }
}
