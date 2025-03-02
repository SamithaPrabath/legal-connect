import {
  eventCreateReject,
  eventCreateRequest,
  eventCreateSuccess,
} from "@redux/slices/event/create";
import {
  eventListReject,
  eventListRequest,
  eventListSuccess,
} from "@redux/slices/event/list";
import {
  timeLineEventReject,
  timeLineEventRequest,
  timeLineEventSuccess,
} from "@redux/slices/event/timelineEvents";
import {
  timeslotReject,
  timeslotRequest,
  timeslotSuccess,
} from "@redux/slices/event/timeslots";
import { EventRequest, EventResponse, TimeLineEvent } from "@type/Event";
import Requests from "@utils/Requests";
import {
  event_timeslot_url,
  event_url,
  events_list_byCaseId,
  events_list_byProfileId,
  timeline_events_byCaseId,
} from "@utils/urls/resources/event";
import { useDispatch } from "react-redux";

export const eventCreateAction =
  (event: EventRequest) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventCreateRequest());

    const success = (data: EventResponse) => {
      dispatch(eventCreateSuccess(data));
    };
    const error = (message: string) => {
      dispatch(eventCreateReject(message));
    };
    const request = new Requests(event_url, event);
    await request.post(success, error);
  };

export const getAvailableTimeSlots =
  (lawyerId: string, date: string) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(timeslotRequest());

    const success = (data: string[]) => {
      dispatch(timeslotSuccess(data));
    };

    const error = (message: string) => {
      dispatch(timeslotReject(message));
    };

    const request = new Requests(event_timeslot_url, null, { lawyerId, date });
    await request.get(success, error);
  };

export const getUpcomingEvents =
  (profileId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventListRequest());

    const success = (data: EventResponse[]) => {
      dispatch(eventListSuccess(data));
    };

    const error = (message: string) => {
      dispatch(eventListReject(message));
    };

    const request = new Requests(events_list_byProfileId(profileId));
    await request.get(success, error);
  };

export const getEventsByCaseId =
  (caseId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventListRequest());

    const success = (data: EventResponse[]) => {
      dispatch(eventListSuccess(data));
    };

    const error = (message: string) => {
      dispatch(eventListReject(message));
    };

    const request = new Requests(events_list_byCaseId(caseId));
    await request.get(success, error);
  };

export const getTimeLineEventsByCaseId =
  (caseId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(timeLineEventRequest());

    const success = (data: TimeLineEvent[]) => {
      dispatch(timeLineEventSuccess(data));
    };

    const error = (message: string) => {
      dispatch(timeLineEventReject(message));
    };

    const request = new Requests(timeline_events_byCaseId(caseId));
    await request.get(success, error);
  };
