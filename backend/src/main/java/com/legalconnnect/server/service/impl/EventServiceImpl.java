package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.dto.event.EventRequestDto;
import com.legalconnnect.server.dto.event.EventResponseDto;
import com.legalconnnect.server.dto.event.TimeLineEventResponseDto;
import com.legalconnnect.server.enums.TimeSlot;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.exception.ValidationException;
import com.legalconnnect.server.model.Case;
import com.legalconnnect.server.model.Event;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.CaseRepository;
import com.legalconnnect.server.repository.EventRepository;
import com.legalconnnect.server.repository.UserRepository;
import com.legalconnnect.server.service.EventService;
import com.legalconnnect.server.utils.EnumUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Transactional
@RequiredArgsConstructor
@Service
public class EventServiceImpl implements EventService {
    private static final Logger log = LoggerFactory.getLogger(EventServiceImpl.class);
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final CaseRepository caseRepository;

    @Override
    public EventResponseDto createOne(EventRequestDto requestDto) throws Exception {
        Event event = toModel(requestDto);
        Event savedEvent = eventRepository.saveAndFlush(event);
        return toDto(savedEvent);
    }

    @Override
    public List<String> getAvailableTimeSlot(Integer lawyerId, String date) throws Exception {
        LocalDate localDate = LocalDate.parse(date);
        List<Event> eventList = eventRepository.findByLawyerIdAndDate(lawyerId, localDate);
        List<String> allTimeSlots = EnumUtils.extractEnum(TimeSlot.class);

        return allTimeSlots
                .stream()
                .filter(timeSlot -> {
                    if (isTimeStampOver(date, timeSlot)) return false;
                    else return eventList.stream()
                            .noneMatch(event ->
                                    Objects.equals(event.getTime(), timeSlot));
                })
                .toList();
    }

    @Override
    public List<EventResponseDto> getUpcomingEvents(Integer userId) throws Exception {
        List<Event> upcomingEvents = eventRepository.getUpcomingEvents(userId);
        return upcomingEvents.stream().filter(this::isUpcomingEvent).map(this::toDto).toList();
    }

    @Override
    public List<EventResponseDto> getEventsByCase(Integer caseId) throws Exception {
        List<Event> eventsByCase = eventRepository.findByCaseId(caseId);
        return eventsByCase.stream().filter(this::isUpcomingEvent).map(this::toDto).toList();
    }

    @Override
    public List<TimeLineEventResponseDto> getTimeLineEventList(Integer caseId) throws Exception {
        List<Event> eventsByCase = eventRepository.findByCaseId(caseId);

        return eventsByCase.stream()
                // filter expired events
                .filter(event -> !isUpcomingEvent(event))
                // map expired events into timeline event
                .map(expiredEvent -> {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
                    String formattedDate = expiredEvent.getDate().format(formatter);

                    return new TimeLineEventResponseDto(formattedDate, expiredEvent.getDescription());
                }).toList();
    }

    @Override
    public List<EventResponseDto> getScheduleByDate(Integer profileId, String date) throws Exception {
        LocalDate localDate = LocalDate.parse(date);
        List<Event> eventList = eventRepository.findByLawyerIdAndDate(profileId, localDate);

        return eventList.stream().map(this::toDto).toList();
    }

    @Override
    public EventResponseDto getLatestUpcomingEventByCase(Integer caseId) throws Exception {
        List<Event> upcomingEventList = eventRepository.findByCaseId(caseId).stream().filter(this::isUpcomingEvent).toList();
        if (upcomingEventList.isEmpty()) return null;
        Event latestUpcomingEvent = upcomingEventList.stream().sorted(Comparator.comparing(this::getTimeStamp)).toList().getFirst();
        return toDto(latestUpcomingEvent);
    }

    @Override
    public EventResponseDto toDto(Event event) {
        EventResponseDto eventResponseDto = new EventResponseDto();
        eventResponseDto.setId(event.getId());
        eventResponseDto.setDate(event.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        eventResponseDto.setTime(TimeSlot.fromString(event.getTime()));
        eventResponseDto.setDescription(event.getDescription());
        eventResponseDto.setTitle(event.getTitle());

        if (event.getACase() != null) {
            eventResponseDto.setCaseId(event.getACase().getId());
        }

        eventResponseDto.setClientId(event.getClient().getId());
        eventResponseDto.setLawyerId(event.getLawyer().getId());
        return eventResponseDto;
    }

    @Override
    public Event toModel(EventRequestDto requestDto) {
        Event event = new Event();
        event.setTime(requestDto.getTime().getDisplayName());

        UserInfo client = userRepository
                .findById(requestDto.getClientId())
                .orElseThrow(() -> new NotFoundException("Client Not Found!"));
        UserInfo lawyer = userRepository
                .findById(requestDto.getLawyerId())
                .orElseThrow(() -> new NotFoundException("Lawyer Not Found!"));

        event.setClient(client);
        event.setLawyer(lawyer);

        try {
            event.setDate(LocalDate.parse(requestDto.getDate()));
        }
        catch (Exception e) {
            log.error("Error occurred while parsing date");
            throw new ValidationException("Error occurred while parsing date", e);
        }

        if (requestDto.getCaseId() != null) {
            Case aCase = caseRepository.findById(requestDto.getCaseId()).orElseThrow(() -> new NotFoundException("Case not found!"));
            event.setACase(aCase);
        }

        event.setDescription(requestDto.getDescription());
        event.setTitle(requestDto.getTitle());
        return event;
    }

    private boolean isUpcomingEvent(Event event) {
        try {
            LocalDateTime eventDateTime = getTimeStamp(event.getDate(), event.getTime());
            LocalDateTime currentDateTime = LocalDateTime.now();

            return currentDateTime.isBefore(eventDateTime);
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTimeStampOver(String date, String timeSlot) {
        LocalDateTime dateTime = getTimeStamp(date, timeSlot);
        return LocalDateTime.now().isAfter(dateTime);
    }

    private LocalDateTime getTimeStamp(Event event) {
        return getTimeStamp(event.getDate(), event.getTime());
    }

    private LocalDateTime getTimeStamp(String date, String timeSlot) {
        LocalDate localDate = LocalDate.parse(date);
        return getTimeStamp(localDate, timeSlot);
    }

    private LocalDateTime getTimeStamp(LocalDate localDate, String timeSlot) {
        int hour = Integer.parseInt(timeSlot.split("\\.")[0]);
        if (timeSlot.endsWith("PM") && !timeSlot.startsWith("12")) hour += 12;
        String timeString = String.format("%s%d:00:00", hour < 10 ? "0" : "", hour);
        log.info("Time String {}", timeString);
        LocalTime localTime = LocalTime.parse(timeString, DateTimeFormatter.ISO_LOCAL_TIME);
        return LocalDateTime.of(localDate, localTime);
    }
}
