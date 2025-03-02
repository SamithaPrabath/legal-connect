import { eventCreateReject, eventCreateRequest, eventCreateSuccess } from "@redux/slices/event/create";
import { eventListReject, eventListRequest, eventListSuccess } from "@redux/slices/event/list";
import { timeslotReject, timeslotRequest, timeslotSuccess } from "@redux/slices/event/timeslots";
import { EventRequest, EventResponse } from "@type/Event";
import Requests from "@utils/Requests";
import { event_timeslot_url, event_url, events_list_byId } from "@utils/urls/resources/event";
import { useDispatch } from "react-redux";

export const eventCreateAction = (event: EventRequest) => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventCreateRequest());

    const success = (data: EventResponse) => {
        dispatch(eventCreateSuccess(data))
    }
    const error = (message: string) => {
        dispatch(eventCreateReject(message))
    }
    const request = new Requests(event_url, event);
    await request.post(success, error);
}

export const getAvailableTimeSlots = (lawyerId: string, date: string) => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(timeslotRequest());

    const success = (data: string[]) => {
        dispatch(timeslotSuccess(data))
    }

    const error = (message: string) => {
        dispatch(timeslotReject(message))
    }

    const request = new Requests(event_timeslot_url, null, {lawyerId, date})
    await request.get(success, error);
}

export const getUpcomingEvents = (profileId: string) => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventListRequest());

    const success = (data: EventResponse[]) => {
        dispatch(eventListSuccess(data));
    }

    const error = (message: string) => {
        dispatch(eventListReject(message));
    }

    const request = new Requests(events_list_byId(profileId));
    await request.get(success, error);
}