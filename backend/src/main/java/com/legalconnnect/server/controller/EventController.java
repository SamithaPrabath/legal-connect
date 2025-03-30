package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.event.EventRequestDto;
import com.legalconnnect.server.dto.event.EventResponseDto;
import com.legalconnnect.server.dto.event.TimeLineEventResponseDto;
import com.legalconnnect.server.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${endpoints.events}")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping("/timeslots")
    public ResponseEntity<StandardResponse<List<String>>> getAvailableTimeSlots(@RequestParam Integer lawyerId, @RequestParam String date) throws Exception {
        List<String> availableTimeSlotList = eventService.getAvailableTimeSlot(lawyerId, date);
        return ResponseEntityManager.ok(availableTimeSlotList);
    }

    @PostMapping
    public ResponseEntity<StandardResponse<EventResponseDto>> createOne(@RequestBody EventRequestDto requestDto) throws Exception {
        EventResponseDto createdEvent = eventService.createOne(requestDto);
        return ResponseEntityManager.created(createdEvent, "Event created successfully!");
    }

    @GetMapping("/byUser/{profileId}")
    public ResponseEntity<StandardResponse<List<EventResponseDto>>> getUpcomingEvents(@PathVariable Integer profileId) throws Exception {
        List<EventResponseDto> upcomingEventList = eventService.getUpcomingEvents(profileId);
        return ResponseEntityManager.ok(upcomingEventList);
    }

    @GetMapping("/byCase/{caseId}")
    public ResponseEntity<StandardResponse<List<EventResponseDto>>> getEventsByCase(@PathVariable Integer caseId) throws Exception {
        List<EventResponseDto> eventsByCase = eventService.getEventsByCase(caseId);
        return ResponseEntityManager.ok(eventsByCase);
    }

    @GetMapping("/timeline/{caseId}")
    public ResponseEntity<StandardResponse<List<TimeLineEventResponseDto>>> getTimelineEventsByCase(@PathVariable Integer caseId) throws Exception {
        List<TimeLineEventResponseDto> timeLineEventList = eventService.getTimeLineEventList(caseId);
        return ResponseEntityManager.ok(timeLineEventList);
    }

    @GetMapping("/byDate")
    public ResponseEntity<StandardResponse<List<EventResponseDto>>> getScheduleByDate(@RequestParam Integer lawyerId, @RequestParam String date) throws Exception {
        List<EventResponseDto> eventList = eventService.getScheduleByDate(lawyerId, date);
        return ResponseEntityManager.ok(eventList);
    }
}
